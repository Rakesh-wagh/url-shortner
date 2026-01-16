import React from 'react';
import { Link } from 'react-router-dom';

const Dashboard = () => {
  return (
    <div className="container py-2">
      <div className="mb-4">
        <h3 className="">Dashboard</h3>
        <p className="text-muted">Overview of your shortened URLs and activity</p>
      </div>

      <div className="row mb-4">
        <div className="col-md-4">
          <div className="card text-center shadow-sm">
            <div className="card-body">
              <h5 className="card-title">Total Links</h5>
              <p className="display-6 fw-bold text-primary">50</p>
            </div>
          </div>
        </div>
        <div className="col-md-4">
          <div className="card text-center shadow-sm">
            <div className="card-body">
              <h5 className="card-title">Clicks</h5>
              <p className="display-6 fw-bold text-success">254</p>
            </div>
          </div>
        </div>
        <div className="col-md-4">
          <div className="card text-center shadow-sm">
            <div className="card-body">
              <h5 className="card-title">Active Links</h5>
              <p className="display-6 fw-bold text-warning">28</p>
            </div>
          </div>
        </div>
      </div>

      <div className="card shadow-sm mb-4">
        <div className="card-header fw-bold">Recent Shortened Links</div>
        <div className="card-body">
          <table className="table table-hover">
            <thead>
              <tr>
                <th scope="col">Short URL</th>
                <th scope="col">Original URL</th>
                <th scope="col">Clicks</th>
                <th scope="col">Created</th>
              </tr>
            </thead>
            <tbody>
              <tr>
                <td><a href="#"> http://127.0.0.1:8080/urls/hSMFHe</a></td>
                <td>https://example.com/long-url</td>
                <td>24</td>
                <td>Jan 10, 2026</td>
              </tr>
              <tr>
                <td><a href="#"> http://127.0.0.1:8080/urls/gWcQYH</a></td>
                <td>https://anotherexample.com/page</td>
                <td>94</td>
                <td>Jan 12, 2026</td>
              </tr>
              <tr>
                <td><a href="#"> http://127.0.0.1:8080/urls/pqr456</a></td>
                <td>https://mysite.com/blog/article</td>
                <td>51</td>
                <td>Jan 14, 2026</td>
              </tr>
            </tbody>
          </table>
        </div>
      </div>

      <div className="card shadow-sm">
        <div className="card-body text-center">
          <h5 className="card-title">Ready to shorten a new link?</h5>
          <p className="text-muted">Generate branded short links and track performance instantly.</p>
          <Link to="/shorten-url">
            <button className="btn btn-primary">Create New Link</button>
          </Link>
        </div>
      </div>
    </div>
  );
};

export default Dashboard;
