import { useEffect } from 'react';
import Table from 'react-bootstrap/Table';


const TableData = ({ data, onDelete, onEdit, onSubmit }) => {
    useEffect(() => {
        const datas = localStorage.getItem('data')
        
        console.log(JSON.parse(datas))
    }, [onSubmit])
    return (
        <div>
            <Table>
                <thead>
                    <tr>
                        <th>name</th>
                        <th>email</th>
                        <th>price</th>
                        <th>quantity</th>
                        <th>city</th>
                        <th>state</th>
                        <th>zipcode</th>
                        <th>action</th>
                    </tr>
                </thead>
                <tbody>
                    {
                         data.map((item, id) => (
                            <tr key={id}>
                                <td>{item.name}</td>
                                <td>{item.email}</td>
                                <td>{item.price}</td>
                                <td>{item.quantity}</td>
                                <td>{item.city}</td>
                                <td>{item.state}</td>
                                <td>{item.zipcode}</td>
                                <td>
                                    <button onClick={()=> onEdit(id, item)}>edit</button>
                                    <button onClick={()=> onDelete(id)}>delete</button>
                                </td>
                            </tr>
                        ))
                    }

                </tbody>
            </Table>
        </div >
    )
}

export default TableData