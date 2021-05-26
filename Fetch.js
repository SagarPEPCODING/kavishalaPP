export const base_url = 'http://localhost:8000';
// export const base_url = 'https://admin.kavishala.in';
import fetch from 'isomorphic-unfetch';
import {
  ContactsOutlined,
  EnhancedEncryptionTwoTone,
} from 'node_modules/@material-ui/icons/index';

var fetchRequests = {
  get: (endpoints) => {
    return fetch(base_url + endpoints)
      .then((data) => {
        console.log(data);
        return data.json().then((jData) => {
          return {
            data: jData,
            status: data.status,
          };
        });
      })
      .catch((err) => {
        console.log('An error occurred');
      });
  },
  secured: (endpoints, method, data) => {
    console.log('i am in secured');
    console.log(endpoints);
    console.log(method);
    console.log(data);
    /**
     * A fetch api layer to fetch the data from the server alongwith sending the authorize token to the server
     * @param  {String} endpoints The endpoints of the API
     * @param  {String} method The method being used for the API
     * @param  {Object,String} method The data to be sent out to the API
     * @return {Promise}      The fetch promise in return
     */
    return fetch(base_url + endpoints, {
      method: method || 'GET',
      headers: {
        Authorization: `Bearer ${localStorage.getItem('token')}`,
        'Content-Type': 'application/json',
      },
      ...(data && {
        body: JSON.stringify(data),
      }),
    })
      .then((data) => {
        console.log(data);
        return data.json().then((jData) => {
          // HANDLE: type of interceptor for the response
          console.log(jData);
          return {
            data: jData,
            status: data.status,
          };
        });
      })
      .catch((err) => {
        console.log('An error occurred');
      });
  },
  post: (endpoints, data) => {
    console.log(endpoints);
    console.log(data);

    return fetch(base_url + endpoints, {
      method: 'POST',
      body: JSON.stringify(data),
      headers: {
        'Content-Type': 'application/json',
      },
    })
      .then((data) => {
        console.log(data);
        return data.json().then((jData) => {
          return {
            data: jData,
            status: data.status,
          };
        });
      })
      .catch((err) => {
        console.log(err);
        console.log('An error occurred');
      });
  },
  put: (endpoints, data) => {
    console.log(endpoints);
    console.log(data);
    console.log('i am in put of fetch.js');
    return fetch(base_url + endpoints, {
      method: 'PUT',
      body: JSON.stringify(data),
      headers: {
        'Content-Type': 'application/json',
      },
    })
      .then((data) => {
        console.log(data);
        return data.json().then((jData) => {
          return {
            data: jData,
            status: data.status,
          };
        });
      })
      .catch((err) => {
        console.log(err);
        console.log('An error occurred');
      });
  },
  securedFormApi: (endpoints, method, data) => {
    return fetch(base_url + endpoints, {
      method: method || 'POST',
      body: data,
      headers: {
        Authorization: `Bearer ${localStorage.getItem('token')}`,
      },
    })
      .then((data) => {
        return data.json().then((jData) => {
          return {
            data: jData,
            status: data.status,
          };
        });
      })
      .catch((err) => {
        console.log('An error occurred');
      });
  },
};
export default fetchRequests;
