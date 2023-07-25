<template>
    <div class="container mt-5">
        <div class="card">
            <div class="card-header">
                <h4>Add Patients</h4>
            </div>
            <div class="card-body">
                <div class="mb-3">
                    <label for="">Name</label>
                    <input type="text" v-model="model.patient.name" class="form-control"/>
                </div>
                <div class="mb-3">
                    <label for="email">Email</label>
                    <input type="text" id="email" v-model="model.patient.email" class="form-control"/>
                </div>
                <div class="mb-3">
                    <label for="id_card">ID Card Number</label>
                    <input type="text" id="id_card" maxlength="13" v-model="model.patient.idcardnumber" class="form-control"/>
                </div>
                <div class="mb-3">
                    <label for="gender">Gender</label>
                    <input type="text" id="gender" v-model="model.patient.gender" class="form-control"/>
                </div>
                <div class="mb-3">
                    <label for="address">Address</label>
                    <input type="text" id="address" v-model="model.patient.address" class="form-control"/>
                </div>
                <div class="mb-3">
                    <label for="phone">Phone</label>
                    <input type="text" id="phone" v-model="model.patient.phone" class="form-control"/>
                </div>
                <div>
                    <label for="birthdate">Birthdate:</label>
                    <VueDatePicker id="birthdate" v-model="model.patient.birthdate"></VueDatePicker>
                </div>
                <div class="mb-3">
                    <button to="/patient" type="button" @click="savePatient" class="btn btn-primary">Save</button>
                </div>
            </div>
        </div>
    </div>
</template>
<script>
import axios from 'axios'
import VueDatePicker from '@vuepic/vue-datepicker';
import '@vuepic/vue-datepicker/dist/main.css'
export default {
    name: 'patientCreate',
    components:{
        VueDatePicker
    },
    data () {
        return { 
            dateFormat: 'yyyy-MM-dd', // Change the format as needed
            inputProps: {
                placeholder: 'Select Birthdate',
            },
            model: {
                patient: {
                    name: '',
                    email: '',
                    idcardnumber: '',
                    gender: '',
                    address: '',
                    phone: '',
                    birthdate: ''
                }
            }
        }
    },
    methods: {
        async savePatient() {
            try {
            console.log(this.model.patient)
            const res = await axios.post('http://localhost:8080/api/patient', this.model.patient)
                alert(res.data.message);
                this.model.patient = {
                    name: this.patient.name,
                    email: this.patient.email,
                    idcardnumber: this.patient.idcardnumber,
                    gender: this.patient.gender,
                    address: this.patient.address,
                    phone: this.patient.phone,
                    birthdate: this.patient.birthdate
                }
            }
            catch (error) {
                console.log(error)
            }
        },
        resetForm() {
            this.model.patient = {
                name: '',
                email: '',
                idcardnumber: '',
                gender: '',
                address: '',
                phone: '',
                birthdate: ''
            };
        }
    }
}
</script>