import { Component, OnInit } from '@angular/core';
import { MembersList, MembersService } from '../../Services/members-service';
import { AuthService } from '../../Services/auth-service';

@Component({
  selector: 'app-members',
  standalone: false,
  templateUrl: './members.html',
  styleUrl: './members.css',
})
export class Members implements OnInit {

  membersList: MembersList[] = [];
  isAdmin: boolean = false;
  selectedMember: MembersList | null = null;
  showEditModal = false;

  constructor(private membersService: MembersService , private authService: AuthService) { }

  ngOnInit(): void {
    this.checkIfAdmin();
    this.loadMembers();
  }

  // 🔐 تحديد هل المستخدم Admin ولا لأ
  checkIfAdmin() {
const token = this.authService.getToken();
    if (!token) {
      this.isAdmin = false;
      return;
    }

    try {
      const payload = token.split('.')[1];
      const decoded = JSON.parse(atob(payload));
      this.isAdmin = decoded.role === 'admin';
    } catch (e) {
      this.isAdmin = false;
    }
  }

  loadMembers() {
    this.membersService.getMembers().subscribe({
      next: (data) => {
        this.membersList = data;
      },
      error: (err) => {
        console.error('Error loading Members', err);
      }
    });
  }

  // 🗑️ DELETE
  deleteMember(id: number) {
    if (!confirm('هل أنت متأكد من الحذف؟')) return;

    this.membersService.deleteMember(id).subscribe({
      next: () => {
        this.membersList = this.membersList.filter(m => m.id !== id);
      },
      error: (err) => {
        console.error('Delete error', err);
      }
    });
  }

  // ✏️ EDIT
  editMember(member: MembersList) {
    this.selectedMember = {
      ...member,
      Name: member.Name || '',
      Position: member.Position || '',
      Image: member.Image || ''
    };
    this.showEditModal = true;
  }

  // 🔹 Close Modal
  closeModal() {
    this.showEditModal = false;
    this.selectedMember = null;
  }

  // 🔹 Update Member (PUT)
  updateMember() {
    if (!this.selectedMember) return;

    this.membersService.editMember(this.selectedMember).subscribe({
      next: () => {
        this.loadMembers();
        this.closeModal();
      },
      error: (err) => {
        console.error('Update error', err);
      }
    });
  }

  // 🔹 تغيير الصورة مع ضغطها
  async onImageChange(event: any) {
    const file = event.target.files[0];
    if (!file || !this.selectedMember) return;

    try {
      const resizedDataUrl = await this.resizeImage(file, 800, 800);
      this.selectedMember.Image = resizedDataUrl;
    } catch (error) {
      console.error('Image resize error', error);
    }
  }

  // 🔹 دالة لضغط الصورة
  resizeImage(file: File, maxWidth: number, maxHeight: number): Promise<string> {
    return new Promise((resolve, reject) => {
      const reader = new FileReader();

      reader.onload = (e: any) => {
        const img = new Image();
        img.onload = () => {
          let width = img.width;
          let height = img.height;

          if (width > maxWidth) {
            height = height * (maxWidth / width);
            width = maxWidth;
          }

          if (height > maxHeight) {
            width = width * (maxHeight / height);
            height = maxHeight;
          }

          const canvas = document.createElement('canvas');
          canvas.width = width;
          canvas.height = height;

          const ctx = canvas.getContext('2d');
          ctx?.drawImage(img, 0, 0, width, height);

          const base64 = canvas.toDataURL('image/jpeg', 0.7);
          resolve(base64);
        };

        img.onerror = err => reject(err);
        img.src = e.target.result;
      };

      reader.onerror = err => reject(err);
      reader.readAsDataURL(file);
    });
  }

}
