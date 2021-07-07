import React from 'react'
import { userlistaction, userlogout, userdeleteaction } from '../Actions/UserActions'
import { Table, Button } from 'react-bootstrap'
import { useDispatch, useSelector } from 'react-redux'
import { useEffect } from 'react'
import { USERLIST_RESET } from '../constants/constants'
const UserListScreen = ({ history }) => {
    const dispatch = useDispatch()
    const userloginreducer = useSelector(state => state.userloginreducer)
    const { userinfo } = userloginreducer
    const userdeletereducer = useSelector(state => state.userdeletereducer)
    const { successDelete } = userdeletereducer
    useEffect(() => {
        if (!userinfo.isAdmin) {
            dispatch({ type: USERLIST_RESET })
            dispatch(userlogout())
            return history.push('/login')
        }
        dispatch(userlistaction())
    }, [dispatch, successDelete, userinfo.isAdmin, history])

    const deleteuser = (id) => {
        if (window.confirm("Are you sure to delte the user")) {
            dispatch(userdeleteaction(id))
        }

    }

    const userlistreducer = useSelector(state => state.userlistreducer)
    const { userlist } = userlistreducer
    return (
        <div className="container my-5" style={{ display: 'flex', flexDirection: 'column' }}>
            <div style={{ float: "left" }}>
                <h1>USERS</h1>
            </div>
            <div style={{ marginTop: "50px" }}>
                <Table striped bordered hover responsive className='table-sm'>
                    <thead>
                        <tr>
                            <th>ID</th>
                            <th>Name</th>
                            <th>email</th>
                            <th>Admin</th>
                            <th></th>
                        </tr>
                    </thead>
                    <tbody>
                        {userlist && userlist.map((user) =>
                            <tr>
                                <th>{user._id}</th>
                                <th>{user.name}</th>
                                <th>{user.email}</th>
                                <th>{user.isAdmin ?
                                    <i className='fas fa-check' style={{ color: 'green' }}></i>
                                    : <i className='fas fa-times' style={{ color: 'red' }}></i>
                                }</th>
                                <th>
                                    <Button
                                        variant='danger'
                                        className='btn-sm'
                                        onClick={() => deleteuser(user._id)}
                                    >
                                        <i className='fas fa-trash'></i>
                                    </Button>
                                </th>
                            </tr>
                        )}

                    </tbody>
                </Table>
            </div>
        </div>
    )
}

export default UserListScreen
