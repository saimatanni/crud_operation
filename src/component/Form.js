import React, { useState, useEffect } from 'react'
import axios from 'axios'
import './Form.css'




const Form = () => {

  const [posts, setPosts] = useState([])



  const [userTitle, setuserTitle] = useState({
    task_name: "",
    start_date: "",
    end_date: "",
    status: 0
  })


  const [task_name, setTask_name] = useState('')
  const [start_date, setStart_date] = useState('')
  const [end_date, setEnd_date] = useState('')
  const [id, setId] = useState('')
  // const [error, setError] = useState('');


  // console.log(userTitle);



  const handelChangeText = (e) => {
    const name = e.target.name;
    const value = e.target.value
    console.log(name, value)

    let list = { ...userTitle }

    console.log(list);

    list[name] = value;
    setuserTitle(list);

  }




  // post API operation
  const handelSubmit = (data) => {


    if (data.task_name.trim().length === 0 || data.start_date.trim().length === 0 || data.end_date.trim().length === 0) {
      alert(
        "Invalid input!!"
      );
      return;
    }


    if (id) {
      handeleEdit()
    }
    else {
      axios.post(`https://goldenharvest-api.herokuapp.com/api/todos`, data)

        .then((res) => {
          console.log(res)
          //  setPosts(res.data)
          handelReceiver()
          setuserTitle({
            task_name: "",
            start_date: "",
            end_date: "",
            status: 0
          })

        })
        .catch(function (error) {

          console.log(error);
        })
    }



  }


  // GET API operation
  const handelReceiver = () => {
    axios.get(`https://goldenharvest-api.herokuapp.com/api/todos`)

      .then((res) => {
        console.log(res)
        setPosts(res.data)

        // setTask_name(res[0].task_name)
        // setStart_date(res[0].start_date)
        // setEnd_date(res[0].end_date)

      })
      .catch(function (error) {

        console.log(error);
      })
  }

  useEffect(() => {
    handelReceiver()

  }, [])


  const deleteUser = (id) => {
    // alert(id)
    axios.delete(`https://goldenharvest-api.herokuapp.com/api/todos/${id}`)
      .then((res) => {
        console.log(res)
        // setPosts(res.data)
        handelReceiver()

      })
      .catch(function (error) {

        console.log(error);
      })


  }

  const editUser = (id, task_name, start_date, end_date) => {
    //console.warn(posts[id - 1])

    // setTask_name(task_name)
    // setStart_date(start_date)
    // setEnd_date(end_date)
    setuserTitle({
      task_name: task_name,
      start_date: start_date,
      end_date: end_date,
      status: 0
    })

    setId(id)

  }
  const handeleEdit = () => {
    // const data ={
    //     id: id,
    //     task_name: task_name,
    //     start_date: start_date,
    //     end_date: end_date,
    //     status: 0,
    // }
    const data = {
      id: id,
      task_name: userTitle.task_name,
      start_date: userTitle.start_date,
      end_date: userTitle.end_date,
      status: 0,
    }
    console.log(data);
    axios.put(`https://goldenharvest-api.herokuapp.com/api/todos/${id}`, data)

      .then((res) => {
        console.log(res)
        handelReceiver()
        setId("")
        setStart_date("")
        setTask_name("")
        setEnd_date("")

      })
      .catch(function (error) {

        console.log(error);
      })

  }

  const handelAction = (id) => {
    const data = {
      status: 1,
    }
    console.log(data);
    axios.put(`https://goldenharvest-api.herokuapp.com/api/todos/${id}`, data)

      .then((res) => {
        console.log(res)
        handelReceiver()


      })
      .catch(function (error) {

        console.log(error);
      })


  }




  return (

    <>
      <div className="style">
        <label>Task Name</label>
        <input
          type="text"
          placeholder="Enter Task Name"
          name="task_name"
          value={userTitle.task_name}

          onChange={(e) => handelChangeText(e)}




        /> <br />

        <label>start Date</label>
        <input
          type="date"
          name="start_date"
          value={userTitle.start_date}
          onChange={(e) => handelChangeText(e)}
        />

        <label>End Date</label>
        <input
          type="date"
          name="end_date"
          value={userTitle.end_date}
          onChange={(e) => handelChangeText(e)}
        />


        {/* <a onClick={()=>handelSubmit(userTitle)}> Submit </a> */}
        <button onClick={() => handelSubmit(userTitle)}> Submit </button>
      </div>

      <div>
        {/* <input type="text" value={task_name} onChange={(e)=>setTask_name(e.target.value)} /> <br />
        <input type="text" value={start_date} onChange={(e)=>setStart_date(e.target.value)} /> <br />
        <input type="text" value={end_date} onChange={(e)=>setEnd_date(e.target.value)} /> <br /> */}

        {/* <button onClick={handeleEdit}>Edit User</button> */}
      </div>

      {/* <ul> */}
      <table>
        <tr>

          <td> <h3>ID </h3> </td>
          <td> <h3>Task name </h3> </td>
          <td><h3> start Date </h3> </td>
          <td> <h3>End Date </h3> </td>
          <td> <h3>Action </h3> </td>


        </tr>


        {

          posts.map(post => {
            if (post.status) {
              return (<>
                <tr key={post.id} >
                  <td className="id">{post.id}</td>
                  <td className="name">{post.task_name}</td>
                  <td className="sdate">{post.start_date}</td>
                  <td className="edate">{post.end_date}</td>




                </tr></>)
            } else {
              return (<>
                <tr key={post.id} >
                  <td className="id">{post.id}</td>
                  <td className="name">{post.task_name}</td>
                  <td className="sdate">{post.start_date}</td>
                  <td className="edate">{post.end_date}</td>

                  <td><button onClick={() => deleteUser(post.id)}>Delete</button> </td>
                  <td><button onClick={() =>
                    editUser(
                      post.id,
                      post.task_name,
                      post.start_date,
                      post.end_date
                    )}>Edit</button> </td>

                  <td><button onClick={() => handelAction(post.id)}>Mark as Complete</button> </td>


                </tr></>)
            }
          }

          )


        }
        {/* </ul> */}
      </table>


    </>
  )
};
export default Form;