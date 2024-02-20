import { Component, ElementRef, NgModule, OnInit, ViewChild } from '@angular/core';
import { StudentService } from '../studentService/student.service';
import { ActivatedRoute, Router } from '@angular/router';
import { FormArray, FormControl, FormGroup, FormsModule, ReactiveFormsModule, Validators } from '@angular/forms';
import { HttpClient, HttpClientModule } from '@angular/common/http';
import { NgxSpinnerModule, NgxSpinnerService } from 'ngx-spinner';
import { NgxPaginationModule } from 'ngx-pagination';
import { Ng2SearchPipeModule } from 'ng2-search-filter';
import { Ng2OrderModule, Ng2OrderPipe } from 'ng2-order-pipe';
import { ToastrModule, ToastrService } from 'ngx-toastr';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { CommonModule } from '@angular/common';
import Swal from 'sweetalert2';

@Component({
  selector: 'app-student',
  standalone: true,
  imports: [
    HttpClientModule,
    FormsModule, 
    ReactiveFormsModule, 
    ToastrModule,
    CommonModule
  ],
  providers:[StudentService, ToastrService],
  templateUrl: './student.component.html',
  styleUrl: './student.component.scss',
})
export class StudentComponent implements OnInit{

  
  constructor (private studentSer : StudentService, private router : Router, private activatedRoute:ActivatedRoute,){ 
    // this.getData()
    // this.getDataOfUser()

    this.studentSer.getApi().subscribe((data:any)=>{
      // this.studentData = data
      let fullname =  data.firstname+data.lastname
      console.log(fullname);
      this.studentData=data      
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
  
  

 

  studentId: any
  ngOnInit(): void {
    // this.spinner.show();

    // setTimeout(() => {
    //   /** spinner ends after 5 seconds */
    //   this.spinner.hide();
    // }, 5000);
    this.activatedRoute.params.subscribe((ele:any)=>{
      console.log(ele);
      this.studentId = ele.id
    })
    
    // this.initializeModal();
    this.getData()

  //   this.dropdownList = [
  //     { item_id: 1, item_text: 'Mumbai' },
  //     { item_id: 2, item_text: 'Bangaluru' },
  //     { item_id: 3, item_text: 'Pune' },
  //     { item_id: 4, item_text: 'Navsari' },
  //     { item_id: 5, item_text: 'New Delhi' }
  //   ];
  //   this.selectedItems = [
  //     { item_id: 3, item_text: 'Pune' },
  //     { item_id: 4, item_text: 'Navsari' }
  //   ];
  //   this.dropdownSettings = {
  //     singleSelection: false,
  //     idField: 'item_id',
  //     textField: 'item_text',
  //     selectAllText: 'Select All',
  //     unSelectAllText: 'UnSelect All',
  //     itemsShowLimit: 3,
  //     allowSearchFilter: true
  //   };

  }

  // onItemSelect(item: any) {
  //   console.log(item);
  // }
  // onSelectAll(items: any) {
  //   console.log(items);
  // }



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

  // @ViewChild('id')  id : ElementRef 
  // id;
  // @ViewChild('status')  status : ElementRef 
  // @ViewChild('firstname')  firstname : ElementRef 
  // @ViewChild('lastname')  lastname : ElementRef 
  // @ViewChild('age')  age : ElementRef 
  // @ViewChild('email')  email : ElementRef 
  // @ViewChild('phno')  phno : ElementRef 
  // @ViewChild('pincode')  pincode : ElementRef 
  // @ViewChild('address')  address : ElementRef 





  statusNg = ""
  firstnameNg='' 
  lastnameNg=''
  ageNg=''
  emailNg=''
  // phnoNg;
  phnoPrimeNg=''
  pincodeNg=''
  addressNg=''
  idNg=''
  documentNg=''

  //validation
  get f (){
    return this.studentForm.controls
  }

  // get statusVali(){
  //   return this.studentForm.get('status')
  // }
  // get firstnameVali(){
  //   return this.studentForm.get('firstname')
  // }
  // get lastnameVali(){
  //   return this.studentForm.get('lastname')
  // }
  // get ageVali(){
  //   return this.studentForm.get('age')
  // }
  // get phnoVali(){
  //   return this.studentForm.get('phno')
  // }
  // get addressVali(){
  //   return this.studentForm.get('address')
  // }
  // get pincodeVali(){
  //   return this.studentForm.get('pincode')
  // }
  // get emailVali(){
  //   return this.studentForm.get('email')
  // }

  studentData :any
  // studentData : studentModel[];
  fullname:any
  getData(){
    this.studentSer.getApi().subscribe((data:any)=>{
      // this.studentData = data
      // let fullname =  data.firstname.concat(data.lastname)
      // this.fullname = fullname
      console.log(data, "data");
      
      this.studentData=data      
    })
  }


  onSelect(event:any){
    console.log(event.target.value)

    // if(event.target.value == 'logout'){
    //   this.router.navigateByUrl("/login")
    //   this.toastr.success("You'r logout")
    //   localStorage.removeItem('LoginData');
    // }
    // else if(event.target.value == 'myprofile'){
    //   this.router.navigateByUrl("/studentprofile")
    // }
    // else if(event.target.value == 'changepassword'){
    //   this.router.navigateByUrl("/changepassword")
    //   this.router.navigate(["/changepassword",this.studentId])
    // }
  } 



  submitData(){
    
    this.submitted=true

    if(this.studentForm.invalid){
      return 
    }
    
    if(this.checked){
      let data = {
        ...this.studentForm.value
      }

      let studentFormEmail = this.studentForm.controls.email.value
      let studentFormPhonePrime = this.studentForm.controls.phnoPrime.value

      let studentFormEmailAnother = this.studentForm.controls.emailAnother.value

      this.studentSer.getApi().subscribe((res)=>{
        let datas
        let d : any = res
         d.find((ele:any)=>{
          return datas=ele.email===studentFormEmail || ele.phnoPrime==studentFormPhonePrime || ele.emailAnother == studentFormEmailAnother || 
                  studentFormEmail == studentFormEmailAnother 
         })
         if(datas){
          // this.toastr.error("Email or phone number already exist or duplicate. Please try with another email")
        }else{
         this.studentSer.postApi(data).subscribe((ele)=>{
          console.log(ele);
          // this.toastr.success('Submit succesfully');
          this.getData()
         })
        }

    })
      this.submitted=false
      // this.studentForm.reset()
    }
    



    // this.submitted=true

    // if(this.studentForm.invalid){
    //   return 
    // }
    
    // if(this.checked){
    //   let data = {
    //     ...this.studentForm.value
    //   }
    //   this.studentSer.postApi(data).subscribe(()=>{  
    //     this.getData()
    //     console.log(data.document);
    //   })

    //   this.submitted=false
    //   // this.studentForm.reset()
    // }
    
    // this.toastr.success('Submit succesfully');
    
  }

  // cancelBtn(){
  //   this.studentForm.reset()
  // }


  isNotLoadingForDelete = true
  isLoadingForDelete = false




//first letter capital
capitalizeFirstLetter(value: string): string {
  return value.charAt(0).toUpperCase() + value.slice(1).toLowerCase();
}

onFirstNameInputChange(event : Event){
  // this.firstnameNg = this.capitalizeFirstLetter(this.firstnameNg)

  const inputElement = event.target as HTMLInputElement;
  const inputValue = inputElement.value;

  // Remove non-numeric characters using a regular expression
  const numericValue = inputValue.replace(/[^a-zA-Z]/g, '');

  // Update the input field value with the cleaned numeric value
  inputElement.value = numericValue;
}

onLastNameInputChange(event : Event){
  // this.lastnameNg = this.capitalizeFirstLetter(this.lastnameNg)

  const inputElement = event.target as HTMLInputElement;
  const inputValue = inputElement.value;

  // Remove non-numeric characters using a regular expression
  const numericValue = inputValue.replace(/[^a-zA-Z]/g, '');

  // Update the input field value with the cleaned numeric value
  inputElement.value = numericValue;
}

// @ViewChild('emailAnother') emailAnother :  ElementRef
checkForDuplicate() {
  // if (this.emailNg && this.emailAnother && this.emailNg === this.emailAnother) {
  //   alert('Duplicate value');
  // }
}

onAddressInputChange(){
  // this.addressNg = this.capitalizeFirstLetter(this.addressNg)
}




acceptedFileTypes: string = '';
documentBtnDesable:boolean = true 
open(event:any){

  // console.log(event.target.value);
  
  this.documentBtnDesable=false    

  switch (event.target.value) {
    case 'pdf':
        this.acceptedFileTypes = '.pdf';
        break;
    case 'png':
        this.acceptedFileTypes = '.png';
        break;
    default:
        this.acceptedFileTypes = '';
        this.documentBtnDesable = true 

          // Reset to allow all file types if "Please select" is chosen
}

}

uploadDocument(value:any){
  console.log(value);
}


//select state by dropdown
allState:string[] = [] ;
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




insert : boolean = true
editBtn(data:any){
  
  // this.insert = false
  console.log(data.id);
  

  Swal.fire({
    title: "Are you sure?",
    text: "You won't be able to revert this!",
    icon: "warning",
    showCancelButton: true,
    confirmButtonColor: "primary",
    cancelButtonColor: "#d33",
    confirmButtonText: "Yes, edit it!"
  }).then((result) => {
    if (result.isConfirmed) {
      // this.router.navigate(['/studentedit',data.id])
      Swal.fire({
        title: "Edit page!",
        text: "Your able to edit the page.",
        icon: "success"
      });
    }
  });
}

cancel(){
  this.studentForm.reset()

  this.insert = true  
}




//search drodown
searchValueByName: any
searchValueByEmail: any
searchValueByPhone: any

searchByName : boolean = true
searchByEmail : boolean = false
searchByPhone : boolean = false
onSelectSearch(event:any){

  console.log(event.target.value)
  // this.searchValue = event.target.value

  if(event.target.value == 'name'){
    this.searchByName = true
    this.searchByEmail = false
    this.searchByPhone = false
  }
  else if(event.target.value == 'email'){
    this.searchByEmail = true
    this.searchByName = false
    this.searchByPhone = false

  }
  else if(event.target.value == 'phone'){
    this.searchByPhone = true
    this.searchByEmail = false
    this.searchByName = false
  }
  else if(event.target.value == 'pleaseselect'){
    this.searchByPhone = false
    this.searchByEmail = false
    this.searchByName = true
  }
}




//disable all table
isTableDisabled: boolean = false;
disableAll(event:any){
  this.checked = !this.checked
  if(event.target.checked == true){
    this.isTableDisabled = true;
  }else{
  this.isTableDisabled = false;

  }
}

//disable chexbox
disabledRows: { [id: number]: boolean } = {};
disableCheckboxClick(event:any, id:any){

  this.checked = !this.checked

  this.disabledRows[id] = event.target.checked;

  if (!event.target.checked) {
    delete this.disabledRows[id];
  }

}


key = 'id'
reverse : boolean = false
sort(key:any){
  this.key = key
  this.reverse = !this.reverse
}


deleteBtn(id:any){

  // console.log(id);

  
  Swal.fire({
    title: "Are you sure?",
    text: "You won't be able to revert this!",
    icon: "warning",
    showCancelButton: true,
    confirmButtonColor: "#3085d6",
    cancelButtonColor: "#d33",
    confirmButtonText: "Yes, delete it!"
  }).then((result) => {
    if (result.isConfirmed) {
      this.studentSer.deleteApi(id).subscribe(()=>{
          this.getData()
      })
      Swal.fire({
        title: "Deleted!",
        text: "Your file has been deleted.",
        icon: "success"
      });
    }
  });
}  























  logo(){
    Swal.fire({
      title: "Welcom to my website.",
      width: 600,
      padding: "3em",
      color: "#716add",
      background: "#fff url(/images/trees.png)",
      backdrop: `
        rgba(0,0,123,0.4)
        url("/images/nyan-cat.gif")
        left top
        no-repeat
      `
    });
    
  }





}
