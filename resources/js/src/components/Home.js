import React, { useEffect, useState } from 'react';
import { Link } from 'react-router-dom';
import AppContainer from './AppContainer';
import api from '../api';
import swal from 'sweetalert';

const Home = () => {
  // added style
  const center_text = {
    textAlign: 'center'
  };

  const margin_left = {
    marginLeft: '3px'
  }

  const [posts, setPosts] = useState(null);

  const fetchPosts = () => {
    api.getAllPosts().then(res => {
      const result = res.data;
      setPosts(result.data);
    })
  }

  // // api route
  // const test_api_route = () => {
  //   axios.get('http://127.0.0.1:8000/api/test')
  //   .then(response=>{
  //     console.log('route', response.data.test)
  //   })
  // }

  // // api resources 
  // const test_api_resources = () => {
  //   api.testPost().then(res => {
  //     const resl = res.data;
  //     console.log('resources', resl.test)
  //   })
  // }


  useEffect(() => {
    fetchPosts();
    // test_api_route();
    // test_api_resources();
  }, []);

  const renderPosts = () => {
    if(!posts) {
      return(
        <tr>
          <td colSpan="4" style={center_text}>
            Loading data...
          </td>
        </tr>
      )
    }
    if(posts.length === 0){
      return(
        <tr>
          <td colSpan="4" style={center_text}>
            There is no data yet. Add one.
          </td>
        </tr>
      )
    }

    return posts.map((post) => (
      <tr key={`Post__${post.id}`} style={center_text}>
        <td>{post.id}</td>
        <td>{post.title}</td>
        <td>{post.description}</td>
        <td>
          <Link
            className="btn btn-warning"
            to={`/edit/${post.id}`}
          >
            Edit
          </Link>
          <button
            type="button"
            className="btn btn-danger"
            onClick={() => {
              swal({
                title: "Are you sure?",
                text: "Once deleted, you will not be able to recover this data!",
                icon: "warning",
                buttons: true,
                dangerMode: true,
              })
              .then((willDelete) => {
                if (willDelete) {
                  api.deletePost(post.id)
                  .then(res => {
                    const result = res.data;
                    console.log('Controller response', result);
                  })
                  .catch(err => {
                    console.log('Failed to delete with id :' + post.id + err);
                  });

                   // calling the fetchPosts method to refresh page
                   fetchPosts();

                  swal("Success! The data has been successfully deleted.", {
                    icon: "success",
                  });
                } else {

                  // calling the fetchPosts method to refresh page
                  fetchPosts();

                  swal("You have aborted the deletion of the data!", {
                    icon: "info",
                    title: "Yiiiikkkeeesss!"
                  });
                }
              });
            }}
          >
            DELETE
          </button>
        </td>
      </tr>
    ))
  }

  return (
    /* acquired Base AppContainer */
    <AppContainer
      title="Laravel ReactJs - CRUD"
    >
      {/* children components */}
      <Link to="/add" className="btn btn-primary">Add New Post</Link>
      
      <Link to="/material_ui" className="btn btn-primary" style={margin_left}>Material UI Test</Link>

      <div className="table-responsive mt-4">
        <table className="table table-striped">
          <thead style={center_text}>
            <tr>
              <th>ID</th>
              <th>Title</th>
              <th>Description</th>
              <th>Action</th>
            </tr>
          </thead>
          <tbody>
            {renderPosts()}
          </tbody>
        </table>
      </div>
    </AppContainer>
  );
};

export default Home;