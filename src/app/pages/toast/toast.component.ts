import { Component } from '@angular/core';
import { ToastrService } from 'ngx-toastr';

@Component({
  selector: 'app-toast',
  standalone: true, // ✅ Mark it standalone so you can import it in other standalone comps
  templateUrl: './toast.component.html',
  styleUrls: ['./toast.component.css'], // ✅ typo: use 'styleUrls' not 'styleUrl'
})
export class ToastComponent {
  constructor(private toastr: ToastrService) {}

  showSuccess(message: string, title?: string) {
    this.toastr.success(message, title || 'Success');
  }

  showError(message: string, title?: string) {
    this.toastr.error(message, title || 'Error');
  }

  showInfo(message: string, title?: string) {
    this.toastr.info(message, title || 'Info');
  }

  showWarning(message: string, title?: string) {
    this.toastr.warning(message, title || 'Warning');
  }
}
