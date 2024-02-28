import { CommonModule } from '@angular/common';
import { HttpClientModule } from '@angular/common/http';
import { Component, ElementRef, OnInit, ViewChild } from '@angular/core';
import { FormArray, FormControl, FormGroup, FormsModule, ReactiveFormsModule, Validators } from '@angular/forms';
import { ToastrModule, ToastrService } from 'ngx-toastr';
import { StudentService } from '../studentService/student.service';
import { ActivatedRoute, Router } from '@angular/router';

@Component({
  selector: 'app-student-edit',
  standalone: true,
  imports: [
    HttpClientModule,
    FormsModule, 
    ReactiveFormsModule, 
    ToastrModule,
    CommonModule
  ],
  templateUrl: './student-edit.component.html',
  styleUrl: './student-edit.component.scss',
  providers : [StudentService]
})
export class StudentEditComponent implements OnInit{
  updatedUser:any
  editedId:any
  ngOnInit(): void {
    this.activatedRoute.params.subscribe((ele:any)=>{
      // console.log(ele)     
      this.editedId=ele.id
    })

    this.studentSer.GetEditUser(this.editedId).subscribe((ele)=>{
      this.updatedUser=ele
      console.log(ele);
    })
  }

 


  submitUserData:string=''
  // cli(da:any){
  //  this.submitUserData= da.srcElement.name
  // }

  submitted :boolean=false
  // checked : boolean = true
  // clickOnCheck(){
  // this.checked = !this.checked
  // }

  checked : boolean = false


  //Phone number number input
  onInputChange(event: Event): void {
  
    const inputElement = event.target as HTMLInputElement;
    const inputValue = inputElement.value;

    // Remove non-numeric characters using a regular expression
    const numericValue = inputValue.replace(/[^0-9]/g, '');

    // Update the input field value with the cleaned numeric value
    inputElement.value = numericValue;
  }
  // check = document.getElementById('checkId')
  
  

  constructor (private studentSer : StudentService, private toastr: ToastrService, private router : Router,
    private activatedRoute:ActivatedRoute){ 
    this.getData()
    
  }

  

  // @ViewChild('checkId') checkId : ElementRef
   checkboxClick(){
    this.checked = !this.checked
    let a = this.checked
    console.log(a);
    
  }
 

  emailPattern = '[a-z0-9._%+-]+@[a-z0-9.-]+\\.[a-z]{3}$'

  studentForm = new FormGroup({
    status : new FormControl(null,[Validators.required]),
    firstname : new FormControl(null,[Validators.required,Validators.pattern('[A-Za-z]+$')]),
    lastname : new FormControl(null,[Validators.required, Validators.pattern('[A-Za-z]+$')]),
    age : new FormControl(null,[Validators.required, Validators.pattern('[0-9]+$')]),
    email : new FormControl(null,[Validators.required,Validators.pattern(this.emailPattern)]),
    emailAnother : new FormArray([]),
    phnoPrime : new FormControl(null,[Validators.required, Validators.minLength(10),Validators.maxLength(10), Validators.pattern('[0-9]+$')]),
    phno : new FormArray([]),
    pincode : new FormControl(null,[Validators.required, Validators.pattern('[0-9]+$'), Validators.minLength(6),Validators.maxLength(6)]),
    country : new FormControl('',Validators.required),
    state : new FormControl('',Validators.required),
    document : new FormControl('',[Validators.required]),
    address : new FormControl(null,[Validators.required]),
    checkbox : new FormControl(null,[Validators.required])
  })  

  get phnoget(){
    return this.studentForm.get('phno') as FormArray
  }

  disableRemove : boolean = true

  addPhone(){
    // this.disableRemove = false;
    // (<FormArray>this.studentForm.get('phno')).push(new FormControl(''))

    // const phoneArray = this.studentForm.get('phno') as FormArray



    // if (phoneArray.length === 0) {
    //   phoneArray.push(new FormControl(''));
    // } else {
    //   phoneArray.clear();
    // }

    this.phnoget.push(new FormControl(''))
  }

  removePhone(ind:any){
    this.phnoget.removeAt(ind)
  }


  addEmail(){
    (this.studentForm.get('emailAnother') as FormArray).push(new FormControl(''))
  }
  removeEmail(i:any){
    (this.studentForm.get('emailAnother') as FormArray).removeAt(i)
  }



  @ViewChild('statusView') statusView! : ElementRef 
  @ViewChild('firstnameView') firstnameView! : ElementRef
  @ViewChild('lastnameView') lastnameView! : ElementRef
  @ViewChild('ageView') ageView! : ElementRef
  @ViewChild('emailView') emailView! : ElementRef
  @ViewChild('phonePrimeView') phonePrimeView! : ElementRef
  @ViewChild('pincodeView') pincodeView! : ElementRef
  @ViewChild('countryView') countryView! : ElementRef
  @ViewChild('stateView') stateView! : ElementRef
  @ViewChild('documentView') documentView! : ElementRef
  @ViewChild('addressView') addressView! : ElementRef


  //validation
  get f (){
    return this.studentForm.controls
  }



  studentData : any;

  getData(){
    this.studentSer.getApi().subscribe((data)=>{
      this.studentData = data
    })
  }

  updateData(){

  // id=this.studentForm.
  
    
    this.submitted=true

    if(this.studentForm.invalid){
      return 
    }
    
    if(this.checked){


      let data = {
        ...this.studentForm.value
   }

      this.studentSer.updateApi(this.editedId, data).subscribe(() => {  
          this.getData();
        }
      );
      
      // this.router.navigateByUrl('student', this.editedId)
      this.router.navigate(['student',this.editedId])
      this.toastr.success("Data succesfully updated")
    
      this.submitted=false
      // this.studentForm.reset()
    }
    

    
  }

  // cancelBtn(){
  //   this.studentForm.reset()
  // }


  isNotLoadingForDelete = true
  isLoadingForDelete = false





  
  
  documentBtnDesable = true 
  open(){
    this.documentBtnDesable=false    
    console.log(this.studentForm.controls.document.value);
  }

  uploadDocument(value:any){
    console.log(value);
  }


   // localstorage
  //  localData = JSON.parse(localStorage.getItem("LoginData"))||[];



  //canDeactivate
  onExit(){
    if(this.statusView || this.firstnameView || this.lastnameView || this.ageView || this.emailView || this.phonePrimeView || 
      this.pincodeView|| this.addressView||this.documentView){
    return confirm("You have unsaved change. Do you really want to discard these change ?")
  }
  else{
    return true;
  }
}



 anotherEmailInput(){
  let anotherEmailValue = this.studentForm.controls.emailAnother.value

  let primeEmailValu = this.studentForm.controls.email.value

  if(anotherEmailValue === primeEmailValu){
    this.toastr.error("Email already exist. Please enter another email")
  }
}



cancelEdit(){
  this.router.navigate(['student',this.editedId])
}





//select state by dropdown
allState : string[] = [] ;
stateDisable : boolean = true

selectCountry(event:any){

this.stateDisable = false

  if(event.target.value == 'India'){
    // alert(event.target.value);
    this.allState = [ "Andhra Pradesh", "Arunachal Pradesh", "Assam", "Bihar", "Chhattisgarh", 
    "Goa", "Gujarat", "Haryana", "Himachal Pradesh", "Jharkhand", 
    "Karnataka", "Kerala", "Madhya Pradesh", "Maharashtra", "Manipur", 
    "Meghalaya", "Mizoram", "Nagaland", "Odisha", "Punjab", 
    "Rajasthan", "Sikkim", "Tamil Nadu", "Telangana", "Tripura", 
    "Uttar Pradesh", "Uttarakhand", "West Bengal", 
    "Andaman and Nicobar Islands", "Chandigarh", 
    "Dadra and Nagar Haveli and Daman and Diu", "Delhi", "Lakshadweep", 
    "Puducherry"]
    
  }
  else if(event.target.value == 'Nepal'){
    // alert(event.target.value);=
    this.allState = ["Province No. 1","Province No. 2","Bagmati Province","Gandaki Province",
    "Lumbini Province","Karnali Province","Sudurpashchim Province"]
  }
  else if(event.target.value == 'Shrilanka'){
    // alert(event.target.value);=
    this.allState = [ "Central", "Eastern", "North Central", "Northern", "North Western", 
    "Sabaragamuwa", "Southern", "Uva", "Western"]
  }
  else{
    this.allState = []
    this.stateDisable = true
  }
}
}
