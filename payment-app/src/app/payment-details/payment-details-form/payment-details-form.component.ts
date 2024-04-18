import { Component } from '@angular/core';
import { PaymentDetailService } from '../../shared/payment-detail.service';
import { NgForm } from '@angular/forms';
import { PaymentDetail } from '../../shared/payment-detail.model';

@Component({
  selector: 'app-payment-details-form',
  templateUrl: './payment-details-form.component.html',
  styleUrl: './payment-details-form.component.css'
})
export class PaymentDetailsFormComponent {

  constructor(public service: PaymentDetailService){}

  successful = false
  updated = false
  
  onSubmit(form: NgForm){
    if(this.service.formData.paymentDetailId==0){
      this.insertRecord(form)
    }
    else{
      this.updateRecord(form)
    }
  }

  insertRecord(form:NgForm){
    this.service.postPaymentDetais().subscribe({
      next:res=>{
       this.service.list = res as PaymentDetail[]
       this.service.resetForm(form)
       this.successful = true
      },
      error:err=>{
        console.log(err)
        this.successful = false
      }
    })
  }
  updateRecord(form:NgForm){
    this.service.putPaymentDetais().subscribe({
      next:res=>{
       this.service.list = res as PaymentDetail[]
       this.service.resetForm(form)
       this.updated = true
      },
      error:err=>{
        console.log(err)
        this.updated = false
      }
    })
  }
}
