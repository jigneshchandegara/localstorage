import React, { useEffect, useState } from 'react';

const Localstorage = () => {


    let [name, setname] = useState('');
    let [email, setemail] = useState('');
    let [password, setpassword] = useState('');

    let [local, setlocal] = useState([]);
    let [updata, setupdata] = useState({});


    let save = () => {
        let obj = {
            name,
            email,
            password
        }
        let newdata = [...local, obj];
        localStorage.setItem("data", JSON.stringify(newdata));
        setlocal(newdata)
        setname('');
        setemail('');
        setpassword('');
    }

    //delete data
    let deletelocal = (index) => {
        console.log(index);
        const localfilterdata = local.filter((val, ind) => {
            return ind !== index;
        })
        setlocal(localfilterdata)
    }

    //updata data

    let handleview = (e) => {
        setupdata({ ...updata, [e.target.name]: e.target.value })
    }

    let addupdata = () => {

       console.log(updata.id);
    }

    //saving data to local storage
    useEffect(() => {
        const storedata = localStorage.getItem('data');
        if (storedata) {
            setlocal(JSON.parse(storedata));
        }
    }, [])

    // localStorage.clear();
    return (
        <>
            <input type="text" name="name" placeholder='enter name' onChange={(e) => setname(e.target.value)} value={name} required /><br />
            <input type="text" name="email" placeholder='enter email' onChange={(e) => setemail(e.target.value)} value={email} required /><br />
            <input type="text" name="password" placeholder='enter password' onChange={(e) => setpassword(e.target.value)} value={password} required /><br />
            <button onClick={save}>Add Data</button>


            <table cellpadding="10px" className="col-12 text-center table-bordered  border-secondary">
                <thead>
                    <tr>
                        <th>No</th>
                        <th>Name</th>
                        <th>Email</th>
                        <th>Password</th>
                        <th>Delete</th>
                        <th>Updata</th>
                    </tr>
                </thead>
                <tbody>
                    {
                        local.map((value, index) => {
                            return (
                                <tr>
                                    <td>{index}</td>
                                    <td>{value.name}</td>
                                    <td>{value.email}</td>
                                    <td>{value.password}</td>
                                    <td><button onClick={() => deletelocal(index)}>delete</button></td>
                                    <td> <button type="button" class="btn btn-primary" data-bs-toggle="modal" data-bs-target="#exampleModal" onClick={() => setupdata(value)}>Updata</button></td>
                                </tr>
                            )
                        })
                    }
                </tbody>
            </table>

            <div class="modal fade" id="exampleModal" tabindex="-1" aria-labelledby="exampleModalLabel" aria-hidden="true">
                <div class="modal-dialog">
                    <div class="modal-content">
                        <div class="modal-header">
                            <h5 class="modal-title" id="exampleModalLabel">Modal title</h5>
                            <button type="button" class="btn-close" data-bs-dismiss="modal" aria-label="Close"></button>
                        </div>
                        <div class="modal-body">
                            <input type="text" name="name" placeholder='enter name' value={updata.name} onChange={handleview} required /><br />
                            <input type="text" name="email" placeholder='enter email' value={updata.email} onChange={handleview} required /><br />
                            <input type="text" name="password" placeholder='enter password' value={updata.password} onChange={handleview} required /><br />
                        </div>
                        <div class="modal-footer">
                            <button type="button" class="btn btn-secondary" data-bs-dismiss="modal">Close</button>
                            <button type="button" class="btn btn-primary" data-bs-dismiss="modal" onClick={addupdata} >Save changes</button>
                        </div>
                    </div>
                </div>
            </div>
        </>
    )
}

export default Localstorage