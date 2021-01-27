import React from 'react';
import axios from 'axios';

const TestUserInfo = (props) => {
    const [imageFile, setImageFile] = React.useState();
    const [imageContributor, setImageContributor] = React.useState('');
    const [showId,setShowId] = React.useState('');
    const [date, setDate] = React.useState('');

    const handleSubmit = () => {
        const formData = new FormData();
        
        formData.append('contributed', imageContributor);
        formData.append('showId',showId);
        formData.append('date',date);
        formData.append('flyerImg', imageFile);
        console.log(formData);
        const config = {
            headers: {
                'content-type': 'multipart/form-data'
            }
        };

        axios.post('/api/showflyer', formData, config)
            .then(res => {
                console.log(res);
            })
            .catch(err => {
                console.log(err);
                console.log(err.response.data.message);

            });
    };

    return (
        <div>
            <div>
                <label htmlFor='show-id'>Show ID</label><br />
                    <input 
                        type='text' 
                        id='show-id' 
                        name='show-id'
                        value={showId}
                        onChange={event => setShowId(event.target.value)} 
                        className='login-input' 
                    /><br />

                    <label htmlFor='contributor-id'>Contributor ID</label><br />
                    <input 
                        type='text' 
                        id='contributor-id' 
                        name='contributor-id'
                        value={imageContributor}
                        onChange={event => setImageContributor(event.target.value)} 
                        className='login-input' 
                    /><br />

                <label htmlFor='date'>Date</label><br />
                <input type='date' id='date' name='date' placeholder='yyyy-mm-dd' value={date} onChange={event => setDate(event.target.value)} />
                <br />

                <label htmlFor='flyer-image'>Flyer Image</label><br />
                <input
                    type='file'
                    id='flyer-image'
                    name='flyer-image'
                    // value={imageFile}
                    onChange={event => setImageFile(event.target.files[0])}
                // className='login-input' 
                /><br />

            </div>
            <div>
                <button className='login-button' type='button' onClick={handleSubmit}>Login</button>
            </div>
            <div>

            </div>
        </div>
    );
};

export default TestUserInfo;