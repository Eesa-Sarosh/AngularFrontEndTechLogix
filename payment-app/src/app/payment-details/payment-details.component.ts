import { Component, OnInit } from '@angular/core';
import { PaymentDetailService } from '../shared/payment-detail.service';
import { PaymentDetail } from '../shared/payment-detail.model';

@Component({
  selector: 'app-payment-details',
  templateUrl: './payment-details.component.html',
  styleUrl: './payment-details.component.css'
})
export class PaymentDetailsComponent implements OnInit {

  constructor(public service: PaymentDetailService){}

  ngOnInit(): void {
    this.service.refreshList()
  }
  populateForm(selectedRecord: PaymentDetail){
    // this is done because having same changes when change the form
    this.service.formData = Object.assign({},selectedRecord) 
  }

  onDelete(id:number){
    if(confirm("Do you want to delete this record?")){
      this.service.deletePaymentDetais(id).subscribe({
        next:res=>{
        this.service.list = res as PaymentDetail[]
        },
        error:err=>{
          console.log(err)
        }
      })
    }
  }
}
