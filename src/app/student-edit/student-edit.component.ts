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

  updatePhoneNumber : any
  updateCountryCode : any
  updatePhoneNum : any
  ngOnInit(): void {
    this.activatedRoute.params.subscribe((ele:any)=>{
      // console.log(ele)     
      this.editedId=ele.id
    })

    this.studentSer.GetEditUser(this.editedId).subscribe((ele:any)=>{
      this.updatedUser=ele
      this.updatePhoneNumber = ele.PhoneNumber  
      console.log(this.updatePhoneNumber);
           
      console.log(ele,"d");

      let split = this.updatePhoneNumber.split(' ')
      this.updateCountryCode =  split[0]
      this.updatePhoneNum = split[1]
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
    allCountries: new FormControl('', Validators.required),
    countryCode: new FormControl('', Validators.required),
    cPhoneNum: new FormControl('', Validators.required),
    pincode : new FormControl(null,[Validators.required, Validators.pattern('[0-9]+$'), Validators.minLength(6),Validators.maxLength(6)]),
    country : new FormControl('',Validators.required),
    state : new FormControl('',Validators.required),
    document : new FormControl('',[Validators.required]),
    address : new FormControl(null,[Validators.required]),
    checkbox : new FormControl(null,[Validators.required])
  })  

  // get phnoget(){
  //   return this.studentForm.get('phno') as FormArray
  // }

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

    // this.phnoget.push(new FormControl(''))
  }

  removePhone(ind:any){
    // this.phnoget.removeAt(ind)
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
    
    let countryCode = this.studentForm.get('countryCode')?.value;
    let cPhoneNum = this.studentForm.get('cPhoneNum')?.value;
    let finalNumber = countryCode + ' ' + cPhoneNum;
    
    if(this.checked){

   let data = {
    status: this.studentForm.controls.status.value,
    firstname: this.studentForm.controls.firstname.value,
    lastname: this.studentForm.controls.lastname.value,
    age: this.studentForm.controls.age.value,
    email: this.studentForm.controls.email.value,
    emailAnother: this.studentForm.controls.emailAnother.value,
    allCountries: this.studentForm.controls.allCountries.value,
    PhoneNumber : finalNumber,
    pincode: this.studentForm.controls.pincode.value,
    country: this.studentForm.controls.country.value,
    state: this.studentForm.controls.state.value,
    document: this.studentForm.controls.document.value,
    address: this.studentForm.controls.address.value,
    checkbox: this.studentForm.controls.checkbox.value,
  };

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




allCountries = [
  { value: 'AF', desc: 'Afghanistan', mobile: '+93' },
  { value: 'AX', desc: 'Åland Islands', mobile: '+358' },
  { value: 'AL', desc: 'Albania', mobile: '+355' },
  { value: 'DZ', desc: 'Algeria', mobile: '+213' },
  { value: 'AS', desc: 'American Samoa', mobile: '+1' },
  { value: 'AD', desc: 'Andorra', mobile: '+376' },
  { value: 'AO', desc: 'Angola', mobile: '+244' },
  { value: 'AI', desc: 'Anguilla', mobile: '+1' },
  { value: 'AQ', desc: 'Antarctica', mobile: '+672' },
  { value: 'AG', desc: 'Antigua and Barbuda', mobile: '+1' },
  { value: 'AR', desc: 'Argentina', mobile: '+54' },
  { value: 'AM', desc: 'Armenia', mobile: '+374' },
  { value: 'AW', desc: 'Aruba', mobile: '+297' },
  { value: 'AU', desc: 'Australia', mobile: '+61' },
  { value: 'AT', desc: 'Austria', mobile: '+43' },
  { value: 'AZ', desc: 'Azerbaijan', mobile: '+994' },
  { value: 'BS', desc: 'Bahamas', mobile: '+1' },
  { value: 'BH', desc: 'Bahrain', mobile: '+973' },
  { value: 'BD', desc: 'Bangladesh', mobile: '+880' },
  { value: 'BB', desc: 'Barbados', mobile: '+1' },
  { value: 'BY', desc: 'Belarus', mobile: '+375' },
  { value: 'BE', desc: 'Belgium', mobile: '+32' },
  { value: 'BZ', desc: 'Belize', mobile: '+501' },
  { value: 'BJ', desc: 'Benin', mobile: '+229' },
  { value: 'BM', desc: 'Bermuda', mobile: '+1' },
  { value: 'BT', desc: 'Bhutan', mobile: '+975' },
  { value: 'BO', desc: 'Bolivia', mobile: '+591' },
  { value: 'BQ', desc: 'Bonaire, Sint Eustatius and Saba', mobile: '+599' },
  { value: 'BA', desc: 'Bosnia and Herzegovina', mobile: '+387' },
  { value: 'BW', desc: 'Botswana', mobile: '+267' },
  { value: 'BV', desc: 'Bouvet Island', mobile: '' },
  { value: 'BR', desc: 'Brazil', mobile: '+55' },
  { value: 'IO', desc: 'British Indian Ocean Territory', mobile: '+246' },
  { value: 'BN', desc: 'Brunei Darussalam', mobile: '+673' },
  { value: 'BG', desc: 'Bulgaria', mobile: '+359' },
  { value: 'BF', desc: 'Burkina Faso', mobile: '+226' },
  { value: 'BI', desc: 'Burundi', mobile: '+257' },
  { value: 'CV', desc: 'Cabo Verde', mobile: '+238' },
  { value: 'KH', desc: 'Cambodia', mobile: '+855' },
  { value: 'CM', desc: 'Cameroon', mobile: '+237' },
  { value: 'CA', desc: 'Canada', mobile: '+1' },
  { value: 'KY', desc: 'Cayman Islands', mobile: '+1' },
  { value: 'CF', desc: 'Central African Republic', mobile: '+236' },
  { value: 'TD', desc: 'Chad', mobile: '+235' },
  { value: 'CL', desc: 'Chile', mobile: '+56' },
  { value: 'CN', desc: 'China', mobile: '+86' },
  { value: 'CX', desc: 'Christmas Island', mobile: '+61' },
  { value: 'CC', desc: 'Cocos (Keeling) Islands', mobile: '+61' },
  { value: 'CO', desc: 'Colombia', mobile: '+57' },
  { value: 'KM', desc: 'Comoros', mobile: '+269' },
  { value: 'CG', desc: 'Congo', mobile: '+242' },
  { value: 'CD', desc: 'Congo, Democratic Republic of the', mobile: '+243' },
  { value: 'CK', desc: 'Cook Islands', mobile: '+682' },
  { value: 'CR', desc: 'Costa Rica', mobile: '+506' },
  { value: 'CI', desc: "Côte d'Ivoire", mobile: '+225' },
  { value: 'HR', desc: 'Croatia', mobile: '+385' },
  { value: 'CU', desc: 'Cuba', mobile: '+53' },
  { value: 'CW', desc: 'Curaçao', mobile: '+599' },
  { value: 'CY', desc: 'Cyprus', mobile: '+357' },
  { value: 'CZ', desc: 'Czech Republic', mobile: '+420' },
  { value: 'DK', desc: 'Denmark', mobile: '+45' },
  { value: 'DJ', desc: 'Djibouti', mobile: '+253' },
  { value: 'DM', desc: 'Dominica', mobile: '+1' },
  { value: 'DO', desc: 'Dominican Republic', mobile: '+1' },
  { value: 'EC', desc: 'Ecuador', mobile: '+593' },
  { value: 'EG', desc: 'Egypt', mobile: '+20' },
  { value: 'SV', desc: 'El Salvador', mobile: '+503' },
  { value: 'GQ', desc: 'Equatorial Guinea', mobile: '+240' },
  { value: 'ER', desc: 'Eritrea', mobile: '+291' },
  { value: 'EE', desc: 'Estonia', mobile: '+372' },
  { value: 'ET', desc: 'Ethiopia', mobile: '+251' },
  { value: 'FK', desc: 'Falkland Islands (Malvinas)', mobile: '+500' },
  { value: 'FO', desc: 'Faroe Islands', mobile: '+298' },
  { value: 'FJ', desc: 'Fiji', mobile: '+679' },
  { value: 'FI', desc: 'Finland', mobile: '+358' },
  { value: 'GF', desc: 'French Guiana', mobile: '+594' },
  { value: 'PF', desc: 'French Polynesia', mobile: '+689' },
  { value: 'TF', desc: 'French Southern Territories', mobile: '' },
  { value: 'GA', desc: 'Gabon', mobile: '+241' },
  { value: 'GM', desc: 'Gambia', mobile: '+220' },
  { value: 'GE', desc: 'Georgia', mobile: '+995' },
  { value: 'DE', desc: 'Germany', mobile: '+49' },
  { value: 'GH', desc: 'Ghana', mobile: '+233' },
  { value: 'GI', desc: 'Gibraltar', mobile: '+350' },
  { value: 'GR', desc: 'Greece', mobile: '+30' },
  { value: 'GL', desc: 'Greenland', mobile: '+299' },
  { value: 'GD', desc: 'Grenada', mobile: '+1' },
  { value: 'GP', desc: 'Guadeloupe', mobile: '+590' },
  { value: 'GU', desc: 'Guam', mobile: '+1' },
  { value: 'GT', desc: 'Guatemala', mobile: '+502' },
  { value: 'GG', desc: 'Guernsey', mobile: '+44' },
  { value: 'GN', desc: 'Guinea', mobile: '+224' },
  { value: 'GW', desc: 'Guinea-Bissau', mobile: '+245' },
  { value: 'GY', desc: 'Guyana', mobile: '+592' },
  { value: 'HT', desc: 'Haiti', mobile: '+509' },
  { value: 'HM', desc: 'Heard Island and McDonald Islands', mobile: '' },
  { value: 'VA', desc: 'Holy See', mobile: '+379' },
  { value: 'HN', desc: 'Honduras', mobile: '+504' },
  { value: 'HK', desc: 'Hong Kong', mobile: '+852' },
  { value: 'HU', desc: 'Hungary', mobile: '+36' },
  { value: 'IS', desc: 'Iceland', mobile: '+354' },
  { value: 'IN', desc: 'India', mobile: '+91' },
  { value: 'ID', desc: 'Indonesia', mobile: '+62' },
  { value: 'IR', desc: 'Iran', mobile: '+98' },
  { value: 'IQ', desc: 'Iraq', mobile: '+964' },
  { value: 'IE', desc: 'Ireland', mobile: '+353' },
  { value: 'IM', desc: 'Isle of Man', mobile: '+44' },
  { value: 'IL', desc: 'Israel', mobile: '+972' },
  { value: 'IT', desc: 'Italy', mobile: '+39' },
  { value: 'JM', desc: 'Jamaica', mobile: '+1' },
  { value: 'JP', desc: 'Japan', mobile: '+81' },
  { value: 'JE', desc: 'Jersey', mobile: '+44' },
  { value: 'JO', desc: 'Jordan', mobile: '+962' },
  { value: 'KZ', desc: 'Kazakhstan', mobile: '+7' },
  { value: 'KE', desc: 'Kenya', mobile: '+254' },
  { value: 'KI', desc: 'Kiribati', mobile: '+686' },
  {
    value: 'KP',
    desc: "Korea, Democratic People's Republic of",
    mobile: '+850',
  },
  { value: 'KR', desc: 'Korea, Republic of', mobile: '+82' },
  { value: 'KW', desc: 'Kuwait', mobile: '+965' },
  { value: 'KG', desc: 'Kyrgyzstan', mobile: '+996' },
  { value: 'LA', desc: "Lao People's Democratic Republic", mobile: '+856' },
  { value: 'LV', desc: 'Latvia', mobile: '+371' },
  { value: 'LB', desc: 'Lebanon', mobile: '+961' },
  { value: 'LS', desc: 'Lesotho', mobile: '+266' },
  { value: 'LR', desc: 'Liberia', mobile: '+231' },
  { value: 'LY', desc: 'Libya', mobile: '+218' },
  { value: 'LI', desc: 'Liechtenstein', mobile: '+423' },
  { value: 'LT', desc: 'Lithuania', mobile: '+370' },
  { value: 'LU', desc: 'Luxembourg', mobile: '+352' },
  { value: 'MO', desc: 'Macao', mobile: '+853' },
  {
    value: 'MK',
    desc: 'Macedonia, the Former Yugoslav Republic of',
    mobile: '+389',
  },
  { value: 'MG', desc: 'Madagascar', mobile: '+261' },
  { value: 'MW', desc: 'Malawi', mobile: '+265' },
  { value: 'MY', desc: 'Malaysia', mobile: '+60' },
  { value: 'MV', desc: 'Maldives', mobile: '+960' },
  { value: 'ML', desc: 'Mali', mobile: '+223' },
  { value: 'MT', desc: 'Malta', mobile: '+356' },
  { value: 'MH', desc: 'Marshall Islands', mobile: '+692' },
  { value: 'MQ', desc: 'Martinique', mobile: '+596' },
  { value: 'MR', desc: 'Mauritania', mobile: '+222' },
  { value: 'MU', desc: 'Mauritius', mobile: '+230' },
  { value: 'YT', desc: 'Mayotte', mobile: '+262' },
  { value: 'MX', desc: 'Mexico', mobile: '+52' },
  { value: 'FM', desc: 'Micronesia, Federated States of', mobile: '+691' },
  { value: 'MD', desc: 'Moldova, Republic of', mobile: '+373' },
  { value: 'MC', desc: 'Monaco', mobile: '+377' },
  { value: 'MN', desc: 'Mongolia', mobile: '+976' },
  { value: 'ME', desc: 'Montenegro', mobile: '+382' },
  { value: 'MS', desc: 'Montserrat', mobile: '+1' },
  { value: 'MA', desc: 'Morocco', mobile: '+212' },
  { value: 'MZ', desc: 'Mozambique', mobile: '+258' },
  { value: 'MM', desc: 'Myanmar', mobile: '+95' },
];

selectedCountryMobileCode: any;

onCountrySelect(event: any) {
  const countryCode = event.target.value;
  const selectedCountry = this.allCountries.find(
    (country) => country.value === countryCode
  );
  if (selectedCountry) {
    this.selectedCountryMobileCode = selectedCountry.mobile;
  } else {
    this.selectedCountryMobileCode = '';
  }
}












}
