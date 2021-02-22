import React, { Component } from 'react';
import { Redirect } from 'react-router-dom';
export default function withAuth(ComponentToProtect) {
  return class extends Component {
    constructor() {
      super();
      this._isMounted = false;
      this.state = {
        loading: true,
        redirect: false,
      };
    }
    componentDidMount() {
        this._isMounted = true;
      fetch('/api/checkadminlogin')
        .then(res => {
          if (res.status === 200) {
              if (this._isMounted) {
                  this.setState({ loading: false });
              }
          } else {
            const error = new Error(res.error);
            throw error;
          }
        })
        .catch(err => {
          console.error(err);
          if (this._isMounted) {

              this.setState({ loading: false, redirect: true });
          }
        });
    };

    componentWillUnmount() {
        this._isMounted=false;
    }
    render() {
      const { loading, redirect } = this.state;
      if (loading) {
        return null;
      }
      if (redirect) {
        return <Redirect to="/login" />;
      }
      return <ComponentToProtect {...this.props} />;
    }
  }
}