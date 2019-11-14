import React, {useState, useEffect} from 'react';
import {withFormik, Form, Field} from 'formik';
import * as Yup from "yup";
import axios from "axios";

const UserForm = ({values, touched, errors, status}) => {
    const [users, setUsers] = useState ([])
    useEffect(() => {
        status && setUsers(users => [...users, status])

    }, [status])

    return (
        <div>
            <Form className="formClass">
                <Field type="text" name="name" placeholder="Name Por Favor"/>
                {touched.name && errors.name}
                <Field type="text" name="email" placeholder="E-mail Por Favor"/>
                {touched.email && errors.email}
                <Field type="password" name="password" placeholder="Password Por Favor"/>
                <Field type ="checkbox" name="termscheckbox" checked={values.termscheckbox}/>

                <button type="submit">Submit To Yourself</button>
            </Form>
            {users.map(user => (
                <div className ="card">
                    <ul key ={user.id}>
                        <li>Name: {user.name}</li>
                        <li>Email: {user.email}</li>
                        <li>Password: {user.password}</li>
                    </ul>
                </div>
            ))}
        </div>
    )
};

const FormikUserForm = withFormik ({
    mapPropsToValues({name, email, password, termscheckbox, membership}){
        return {
            name: name || "",
            email: email || "",
            password: password || "",
            termscheckbox: termscheckbox || false,
        };
    },
    validationSchema: Yup.object().shape({
        name: Yup.string().required(),
        email: Yup.string().required(),
        password: Yup.string().required(),
        termscheckbox: Yup.boolean().oneOf([true]).required()
    }),
    handleSubmit(values, {setStatus}) {
        axios.post('https://reqres.in/api/users', values)
        .then(res => {setStatus(res.data);})
        .catch(err => console.log(err.response))
    }

})(UserForm);

export default FormikUserForm;
