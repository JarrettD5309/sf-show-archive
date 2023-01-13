import React, { useEffect } from 'react';
import { Navigate } from "react-router-dom"
import axios from 'axios';

const ProtectedRouteAdmin = ({ children }) => {
    const [loading, setLoading] = React.useState(true);
    const [isAdmin, setIsAdmin] = React.useState(false);

    useEffect(() => {
        const checkAdminLogin = () => {
            axios.get('/api/checkadminlogin')
                .then(res => {
                    if (res.status === 200) {
                        setIsAdmin(true);
                        setLoading(false);
                    } else {
                        setIsAdmin(false);
                        setLoading(false);
                    }
                })
                .catch(err => {
                    console.log(err);
                    setLoading(false);
                });
        };

        checkAdminLogin();

    }, []);

    const adminRender = () => {
        if (!isAdmin) {
            return <Navigate to="/" replace />;
        } else {
            return children;
        } 
    };

    return (
        loading ? null : adminRender()
    );
}

export default ProtectedRouteAdmin;