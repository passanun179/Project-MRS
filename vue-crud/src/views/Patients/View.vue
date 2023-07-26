<template>
    <div class="container mt-5">
        <div class="card">
        <div class="card-header">
            <h4>
                patients
                <RouterLink to="/patients/create" class="btn btn-primary float-end">
                    Add Patient
                </RouterLink>
            </h4>
        </div>
        <div class="card-body">
            <table class="table table-bordered">
                <thead>
                    <tr>
                        <th>ID</th>
                        <th>NAME</th>
                        <th>IDCARDNUMBER</th>
                        <th>GENDER</th>
                        <th>BIRTH DATE</th>
                        <th>EMAIL</th>
                        <th>PHONE</th>
                        <th>ADDRESS</th>
                        <th>ACTION</th>
                    </tr>
                </thead>
                <tbody v-if="data && data.length > 0">
                    <tr v-for="(patient, index) in data" :key="index">
                        <td>{{ patient._id }}</td>
                        <td>{{ patient.name }}</td>
                        <td>{{ patient.idcardnumber }}</td>
                        <td>{{ patient.gender }}</td>
                        <td>{{ patient.birthdate }}</td>
                        <td>{{ patient.email }}</td>                        
                        <td>{{ patient.phone }}</td>
                        <td>{{ patient.address }}</td>
                        <td>
                            <button>
                                <RouterLink :to="{ path: '/patients/' + patient._id }" type="button" class="btn-success float-end edit-button">
                                Edit
                            </RouterLink>
                            </button>
                            <button type="button" @click="deletePatient(patient._id)" class="btn btn-danger">
                                Delete
                            </button>
                        </td>
                    </tr>
                </tbody>
                <tbody v-else>
                    <tr>
                        <td colspan="10">Loading..</td>
                    </tr>
                </tbody>
            </table>
        </div>
    </div>
    </div>
</template>  
<script>
import axios from 'axios';
export default{
    name: 'patients',
    data() {
            return {
                data: []
            }
        },
        mounted() {
            this.getPatients();
        },
        methods: {
            async getPatients(){
                try {
                    const res = await axios.get("http://localhost:8080/api/patient")
                    this.data = res.data.data;
                } catch (error) {
                    console.log(error)
                }
            },
            deletePatient(patientId){
                if(confirm('Are you sure to delete this patient?')){
                    axios.delete(`http://localhost:8080/api/patient/${patientId}`)
                    .then(res =>{
                        alert(res.data.message);
                        this.getPatients();
                });

                }
            }
        }

}
</script>
<style>
.edit-button {
    color: #fff;
    border-radius: 1rem;
}
</style>
