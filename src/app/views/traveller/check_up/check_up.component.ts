import { Component, OnInit } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { FormControl, Validators } from '@angular/forms';

import { MErrorStateMatcher } from '../../../models/MErrorStateMatcher.model';
import { Traveller } from '../../../models/Traveller.model';
import { KVFormControl } from '../../../models/KVFormControl.model';

@Component({
  templateUrl: 'check_up.component.html',
  styleUrls: ['check_up.component.scss'],
})

export class CheckUpComponent implements OnInit {
  matcher = new MErrorStateMatcher();
  TravellerInstance = new Traveller(this.http);
  FCTraveller: KVFormControl = {};

  genders = [
    { value: 'male', viewValue: 'Male' },
    { value: 'female', viewValue: 'Female' },
  ];

  identity_types = [
    { value: 'kenyan_id', viewValue: 'Kenyan ID' },
    { value: 'alien_id', viewValue: 'Alien ID' },
    { value: 'passport', viewValue: 'Passport' },
    { value: 'birth_certificate', viewValue: 'Birth Certificate' },
  ];

  nationalities = [
    { value: 'kenya', viewValue: 'Kenya' },
    { value: 'other', viewValue: 'Other' },
  ];

  constructor(private http: HttpClient) { }

  ngOnInit(): void {
    this.seedFormControls();
  }

  onSubmit(): void {
    let is_valid = true;

    Object.keys(this.FCTraveller).forEach(fc_key => {
      if (this.FCTraveller[fc_key].hasError("required")) {
        is_valid = false;
        return;
      }
    });

    if (is_valid) {
      this.TravellerInstance._processing = true;
      this.TravellerInstance.createInstance();
    }
  }


  seedFormControls() {
    this.FCTraveller["nationality"] = new FormControl('', [Validators.required]);
    this.FCTraveller["_identity_type"] = new FormControl('', [Validators.required]);
    this.FCTraveller["_identity_number"] = new FormControl('', [Validators.required]);
    this.FCTraveller["first_name"] = new FormControl('', [Validators.required]);
    this.FCTraveller["middle_name"] = new FormControl('', []);
    this.FCTraveller["last_name"] = new FormControl('', [Validators.required]);
    this.FCTraveller["gender"] = new FormControl('', [Validators.required]);
    this.FCTraveller["dob"] = new FormControl('', [Validators.required]);
    this.FCTraveller["occupation"] = new FormControl('', [Validators.required]);
    this.FCTraveller["date_of_arrival"] = new FormControl('', [Validators.required]);
    this.FCTraveller["entry_point"] = new FormControl('', [Validators.required]);
    this.FCTraveller["departure_country"] = new FormControl('', [Validators.required]);
    this.FCTraveller["departure_town"] = new FormControl('', [Validators.required]);
    this.FCTraveller["transport_mode"] = new FormControl('', [Validators.required]);
    this.FCTraveller["travel_purpose"] = new FormControl('', []);
  }

}
