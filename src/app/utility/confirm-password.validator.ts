import {AbstractControl} from '@angular/forms';
export class ConfirmPasswordValidator {
    static MatchPassword(control: AbstractControl) {
        let password = control.get('password').value;

        let confirmPassword = control.get('confpassword').value;

        if (password !== confirmPassword) {
            control.get('confpassword').setErrors( {ConfirmPassword: true} );
        } else {
            return null;
        }
    }

}
