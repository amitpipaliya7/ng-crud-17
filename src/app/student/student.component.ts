import {  Component,  ElementRef,  NgModule,  OnInit,  ViewChild,} from '@angular/core';
import { StudentService } from '../studentService/student.service';
import { ActivatedRoute, Router } from '@angular/router';
import {  FormArray,  FormControl,  FormGroup,  FormsModule,  ReactiveFormsModule,  Validators,
} from '@angular/forms';
import { HttpClient, HttpClientModule } from '@angular/common/http';
import { NgxSpinnerModule, NgxSpinnerService } from 'ngx-spinner';
import { NgxPaginationModule } from 'ngx-pagination';
import { Ng2SearchPipeModule } from 'ng2-search-filter';
import { Ng2OrderModule, Ng2OrderPipe } from 'ng2-order-pipe';
import { ToastrModule, ToastrService } from 'ngx-toastr';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { CommonModule } from '@angular/common';
import Swal from 'sweetalert2';
import { NameFilterPipe } from '../pipe/name-filter.pipe';
import { EmailFilterPipe } from '../pipe/email-filter.pipe';
import { PhoneFilterPipe } from '../pipe/phone-filter.pipe';
import { AddressPipe } from '../pipe/address.pipe';

@Component({
  selector: 'app-student',
  standalone: true,
  imports: [
    HttpClientModule,
    FormsModule,
    ReactiveFormsModule,
    ToastrModule,
    CommonModule,
    NameFilterPipe,
    EmailFilterPipe,
    PhoneFilterPipe,
    AddressPipe,
    NgxPaginationModule,
    NgxSpinnerModule,
  ],
  providers: [
    StudentService,
    ToastrService,
    NgxSpinnerService,
    HttpClientModule,
  ],
  templateUrl: './student.component.html',
  styleUrl: './student.component.scss',
})
export class StudentComponent implements OnInit {
  constructor(
    private studentSer: StudentService,
    private router: Router,
    private activatedRoute: ActivatedRoute,
    private toastr: ToastrService,
    private spinner: NgxSpinnerService
  ) {
    // this.getData()
    // this.getDataOfUser()

    this.studentSer.getApi().subscribe((data: any) => {
      // this.studentData = data
      let fullname = data.firstname + data.lastname;
      console.log(fullname);
      this.studentData = data;
    });
  }

  submitUserData: string = '';
  // cli(da:any){
  //  this.submitUserData= da.srcElement.name
  // }

  submitted: boolean = false;
  // checked : boolean = true
  // clickOnCheck(){
  // this.checked = !this.checked
  // }

  checked: boolean = false;

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

  studentId: any;
  ngOnInit(): void {
    // this.spinner.show();

    // setTimeout(() => {
    //   /** spinner ends after 5 seconds */
    //   this.spinner.hide();
    // }, 5000);
    this.activatedRoute.params.subscribe((ele: any) => {
      console.log(ele);
      this.studentId = ele.id;
    });

    // this.initializeModal();
    this.getData();
  }

  // onItemSelect(item: any) {
  //   console.log(item);
  // }
  // onSelectAll(items: any) {
  //   console.log(items);
  // }

  // @ViewChild('checkId') checkId : ElementRef
  checkboxClick() {
    this.checked = !this.checked;
    let a = this.checked;
    console.log(a);
  }

  emailPattern = '[a-z0-9._%+-]+@[a-z0-9.-]+\\.[a-z]{3}$';

  studentForm = new FormGroup({
    status: new FormControl(null, [Validators.required]),
    firstname: new FormControl(null, [Validators.required,Validators.pattern('[A-Za-z]+$'),]),
    lastname: new FormControl(null, [Validators.required,Validators.pattern('[A-Za-z]+$'),]),
    age: new FormControl(null, [Validators.required,Validators.pattern('[0-9]+$'),]),
    email: new FormControl(null, [Validators.required,Validators.pattern(this.emailPattern), ]),
    emailAnother: new FormArray([]),
    // emailAnother : new FormArray<any>([],[Validators.required,Validators.pattern(this.emailPattern)]),
    // phnoPrime: new FormControl(null, [Validators.required, Validators.minLength(10), Validators.maxLength(10),  Validators.pattern('[0-9]+$'),]),
    // phno: new FormArray([]),
    allCountries: new FormControl('', Validators.required),
    countryCode: new FormControl('', Validators.required),
    cPhoneNum: new FormControl('', Validators.required),
    pincode: new FormControl(null, [Validators.required,Validators.pattern('[0-9]+$'),  Validators.minLength(6), Validators.maxLength(6),]),
    country: new FormControl('', Validators.required),
    state: new FormControl('', Validators.required),
    document: new FormControl('', [Validators.required]),
    address: new FormControl(null, [Validators.required]),
    checkbox: new FormControl(null, [Validators.required]),
  });

  get emailAnotherGet() {
    return this.studentForm.get('emailAnother') as FormArray;
  }

  // get phnoget() {
  //   return this.studentForm.get('phno') as FormArray;
  // }

  disableRemove: boolean = true;

  // addPhone() {
  //   this.phnoget.push(new FormControl(''));
  // }

  // removePhone(ind: any) {
  //   this.phnoget.removeAt(ind);
  // }

  addEmail() {
    // (this.studentForm.get('emailAnother') as FormArray).push(new FormControl(''))
    this.emailAnotherGet.push(new FormControl(''));
  }
  removeEmail(i: any) {
    (this.studentForm.get('emailAnother') as FormArray).removeAt(i);
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

  statusNg: any;
  firstnameNg: any;
  lastnameNg: any;
  ageNg: any;
  emailNg: any;
  // phnoNg;
  phnoPrimeNg: any;
  pincodeNg: any;
  addressNg: any;
  idNg: any;
  documentNg: any;
  countryCodeNg: any;
  cPhoneNumNg: any;

  //validation
  get f() {
    return this.studentForm.controls;
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

  studentData: any;
  // studentData : studentModel[];
  fullname: any;
  getData() {
    this.studentSer.getApi().subscribe((data: any) => {
      // this.studentData = data
      // let fullname =  data.firstname.concat(data.lastname)
      // this.fullname = fullname
      console.log(data, 'data');

      this.studentData = data;
    });
  }

  onSelect(event: any) {
    console.log(event.target.value);

    if (event.target.value == 'logout') {
      this.spinner.show();
      setTimeout(() => {
        this.spinner.hide();
        this.router.navigateByUrl('/login');
        this.toastr.success("You'r logout");
        localStorage.removeItem('token');
      }, 1000);
    } else if (event.target.value == 'myprofile') {
      // this.router.navigateByUrl("/studentprofile")
    } else if (event.target.value == 'changepassword') {
      this.spinner.show();
      setTimeout(() => {
        this.spinner.hide();
        this.router.navigate(['/changepassword', this.studentId]);
      }, 1000);
    }
  }

  submitData() {
    this.submitted = true;

    if (this.studentForm.invalid) {
      return;
    }

    
    let countryCode = this.studentForm.get('countryCode')?.value;
    let cPhoneNum = this.studentForm.get('cPhoneNum')?.value;
    let finalNumber = countryCode + ' ' + cPhoneNum;



    if (this.checked) {
      // let data = {
      //   number:final,
      //   ...this.studentForm.value
      // }

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

      let studentFormEmail = this.studentForm.controls.email.value;
      let studentFormPhonePrime = this.studentForm.controls.cPhoneNum.value;

      let studentFormEmailAnother =
        this.studentForm.controls.emailAnother.value;

      this.studentSer.getApi().subscribe((res) => {
        let datas;
        let d: any = res;
        d.find((ele: any) => {
          return (datas =
            ele.email === studentFormEmail ||
            ele.phnoPrime == studentFormPhonePrime ||
            ele.emailAnother == studentFormEmailAnother ||
            studentFormEmail == studentFormEmailAnother);
        });
        if (datas) {
          this.toastr.error(
            'Email or phone number already exist or duplicate. Please try with another email'
          );
        } else {
          this.studentSer.postApi(data).subscribe((ele) => {
            console.log(ele);
            this.toastr.success('Submit succesfully');
            this.getData();
          });
        }
      });
      this.submitted = false;
      // this.studentForm.reset()
    }
  }

  // cancelBtn(){
  //   this.studentForm.reset()
  // }

  isNotLoadingForDelete = true;
  isLoadingForDelete = false;

  //first letter capital
  capitalizeFirstLetter(value: string): string {
    return value.charAt(0).toUpperCase() + value.slice(1).toLowerCase();
  }

  onFirstNameInputChange(event: Event) {
    // this.firstnameNg = this.capitalizeFirstLetter(this.firstnameNg)

    const inputElement = event.target as HTMLInputElement;
    const inputValue = inputElement.value;

    // Remove non-numeric characters using a regular expression
    const numericValue = inputValue.replace(/[^a-zA-Z]/g, '');

    // Update the input field value with the cleaned numeric value
    inputElement.value = numericValue;
  }

  onLastNameInputChange(event: Event) {
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

  onAddressInputChange() {
    // this.addressNg = this.capitalizeFirstLetter(this.addressNg)
  }

  acceptedFileTypes: string = '';
  documentBtnDesable: boolean = true;
  open(event: any) {
    // console.log(event.target.value);

    this.documentBtnDesable = false;

    switch (event.target.value) {
      case 'pdf':
        this.acceptedFileTypes = '.pdf';
        break;
      case 'png':
        this.acceptedFileTypes = '.png';
        break;
      default:
        this.acceptedFileTypes = '';
        this.documentBtnDesable = true;

      // Reset to allow all file types if "Please select" is chosen
    }
  }

  uploadDocument(value: any) {
    console.log(value);
  }

  //select state by dropdown
  allState: string[] = [];
  stateDisable: boolean = true;

  selectCountry(event: any) {
    this.stateDisable = false;

    if (event.target.value == 'India') {
      // alert(event.target.value);
      this.allState = [
        'Andhra Pradesh',
        'Arunachal Pradesh',
        'Assam',
        'Bihar',
        'Chhattisgarh',
        'Goa',
        'Gujarat',
        'Haryana',
        'Himachal Pradesh',
        'Jharkhand',
        'Karnataka',
        'Kerala',
        'Madhya Pradesh',
        'Maharashtra',
        'Manipur',
        'Meghalaya',
        'Mizoram',
        'Nagaland',
        'Odisha',
        'Punjab',
        'Rajasthan',
        'Sikkim',
        'Tamil Nadu',
        'Telangana',
        'Tripura',
        'Uttar Pradesh',
        'Uttarakhand',
        'West Bengal',
        'Andaman and Nicobar Islands',
        'Chandigarh',
        'Dadra and Nagar Haveli and Daman and Diu',
        'Delhi',
        'Lakshadweep',
        'Puducherry',
      ];
    } else if (event.target.value == 'Nepal') {
      // alert(event.target.value);=
      this.allState = [
        'Province No. 1',
        'Province No. 2',
        'Bagmati Province',
        'Gandaki Province',
        'Lumbini Province',
        'Karnali Province',
        'Sudurpashchim Province',
      ];
    } else if (event.target.value == 'Shrilanka') {
      // alert(event.target.value);=
      this.allState = [
        'Central',
        'Eastern',
        'North Central',
        'Northern',
        'North Western',
        'Sabaragamuwa',
        'Southern',
        'Uva',
        'Western',
      ];
    } else {
      this.allState = [];
      this.stateDisable = true;
    }
  }

  insert: boolean = true;
  editBtn(data: any) {
    // this.insert = false
    console.log(data.id);

    Swal.fire({
      title: 'Are you sure?',
      text: "You won't be able to revert this!",
      icon: 'warning',
      showCancelButton: true,
      confirmButtonColor: 'primary',
      cancelButtonColor: '#d33',
      confirmButtonText: 'Yes, edit it!',
    }).then((result) => {
      if (result.isConfirmed) {
        this.spinner.show();

        setTimeout(() => {
          this.spinner.hide();
          this.router.navigate(['/studentedit', data.id]);
          Swal.fire({
            title: 'Edit page!',
            text: 'Your able to edit the page.',
            icon: 'success',
          });
        }, 2000);
      }
    });
  }

  cancel() {
    this.studentForm.reset();

    this.insert = true;
  }

  //search drodown
  searchValueByName: any;
  searchValueByEmail: any;
  searchValueByPhone: any;

  searchByName: boolean = true;
  searchByEmail: boolean = false;
  searchByPhone: boolean = false;
  onSelectSearch(event: any) {
    console.log(event.target.value);
    // this.searchValue = event.target.value

    if (event.target.value == 'name') {
      this.searchByName = true;
      this.searchByEmail = false;
      this.searchByPhone = false;
    } else if (event.target.value == 'email') {
      this.searchByEmail = true;
      this.searchByName = false;
      this.searchByPhone = false;
    } else if (event.target.value == 'phone') {
      this.searchByPhone = true;
      this.searchByEmail = false;
      this.searchByName = false;
    } else if (event.target.value == 'pleaseselect') {
      this.searchByPhone = false;
      this.searchByEmail = false;
      this.searchByName = true;
    }
  }

  //disable all table
  isTableDisabled: boolean = false;
  disableAll(event: any) {
    this.checked = !this.checked;
    if (event.target.checked == true) {
      this.isTableDisabled = true;
    } else {
      this.isTableDisabled = false;
    }
  }

  //disable chexbox
  disabledRows: { [id: number]: boolean } = {};
  disableCheckboxClick(event: any, id: any) {
    this.checked = !this.checked;

    this.disabledRows[id] = event.target.checked;

    if (!event.target.checked) {
      delete this.disabledRows[id];
    }
  }

  key = 'id';
  reverse: boolean = false;
  sort(key: any) {
    this.key = key;
    this.reverse = !this.reverse;
  }

  deleteBtn(id: any) {
    // console.log(id);

    Swal.fire({
      title: 'Are you sure?',
      text: "You won't be able to revert this!",
      icon: 'warning',
      showCancelButton: true,
      confirmButtonColor: '#3085d6',
      cancelButtonColor: '#d33',
      confirmButtonText: 'Yes, delete it!',
    }).then((result) => {
      if (result.isConfirmed) {
        this.spinner.show();
        setTimeout(() => {
          this.spinner.hide();
          this.studentSer.deleteApi(id).subscribe(() => {
            this.getData();
          });
          Swal.fire({
            title: 'Deleted!',
            text: 'Your file has been deleted.',
            icon: 'success',
          });
        }, 2000);
      }
    });
  }

  logo() {
    Swal.fire({
      title: 'Welcom to my website.',
      width: 600,
      padding: '3em',
      color: '#716add',
      background: '#fff url(/images/trees.png)',
      backdrop: `
        rgba(0,0,123,0.4)
        url("/images/nyan-cat.gif")
        left top
        no-repeat
      `,
    });
  }

  myProfile() {
    this.spinner.show();
    setTimeout(() => {
      this.spinner.hide();
      this.router.navigate(['/studentprofile', this.studentId]);
    }, 2000);
  }

  //canDeactivate
  onExit() {
    if (
      this.statusNg ||
      this.firstnameNg ||
      this.lastnameNg ||
      this.ageNg ||
      this.emailNg ||
      this.phnoPrimeNg ||
      this.pincodeNg ||
      this.addressNg ||
      this.documentNg
    ) {
      return confirm(
        'You have unsaved change. Do you really want to discard these change ?'
      );
    } else {
      return true;
    }
  }

  //pagination
  page: number = 1;
  count: number = 0;
  tableSize: number = 5;
  tableSizes: any = [5, 10, 15, 20];

  // dataOfUserApi
  // getDataOfUser(){
  //   this.studentSer.getApiOfUser().subscribe((data)=>{
  //     this.dataOfUserApi = data
  //   })
  // }

  onTableDataChange(event: any) {
    this.page = event;
    // this.getDataOfUser()
    this.getData();
  }

  onTableSizeChange(event: any) {
    this.tableSize = event.target.value;
    this.page = 1;
    // this.getDataOfUser()
    this.getData();
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
