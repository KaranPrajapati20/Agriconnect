import React, { useEffect, useState } from 'react';
import { FaPen } from 'react-icons/fa'; // Edit icon

const Profile = () => {
    const [user, setUser] = useState(null);
    const [isEditing, setIsEditing] = useState(false);
    const [formData, setFormData] = useState({
        name: '',
        role: '',
        username: '',
        email: '',
        phoneNo: '',
        dob: '',
        address: '',
        picture: ''
    });
    const [newPicture, setNewPicture] = useState(null);

    useEffect(() => {
        // Load user data from local storage
        const storedUser = localStorage.getItem('user');
        if (storedUser) {
            const user = JSON.parse(storedUser);
            setUser(user);
            setFormData(user);
        }
    }, []);

    const handleEditToggle = () => {
        setIsEditing(!isEditing);
    };

    const handleInputChange = (e) => {
        const { name, value } = e.target;
        setFormData((prevData) => ({ ...prevData, [name]: value }));
    };

    const handleSave = () => {
        // Save the updated user data (including the new picture if available)
        const updatedUser = { ...formData };
        if (newPicture) {
            updatedUser.picture = newPicture; // Save the new picture
        }
        setUser(updatedUser);
        setIsEditing(false);
        localStorage.setItem('user', JSON.stringify(updatedUser)); // Update localStorage
    };

    const handlePictureChange = (e) => {
        const file = e.target.files[0];
        if (file) {
            const reader = new FileReader();
            reader.onloadend = () => {
                setNewPicture(reader.result); // Set new picture preview
            };
            reader.readAsDataURL(file); // Convert image to base64
        }
    };

    if (!user) {
        return (
            <div className="flex items-center justify-center min-h-screen">
                <p className="text-gray-600">Loading profile...</p>
            </div>
        );
    }

    return (
        <div className="profile-container min-h-screen bg-gray-50 p-4">
            <div className="max-w-md mx-auto bg-white p-8 rounded-lg shadow-lg mt-10 border border-gray-200">
                {/* Profile Image and Edit Button */}
                <div className="relative flex justify-center items-center mb-6">
                    <img
                        src={newPicture || user.picture || 'https://via.placeholder.com/100'}
                        alt="Profile"
                        className="w-24 h-24 rounded-full mb-4 object-cover"
                    />
                    {isEditing && (
                        <div className="bg-transparent absolute top-0 left-0 w-full h-full flex justify-center items-center bg-gray-900 bg-opacity-50 rounded-full cursor-pointer">
                            <input
                                type="file"
                                accept="image/*"
                                onChange={handlePictureChange}
                                className="absolute inset-0 opacity-0 cursor-pointer"
                            />
                           
                        </div>
                    )}
                    {!isEditing && (
                        <button
                            onClick={handleEditToggle}
                            className="absolute top-2 right-2 bg-gray-200 p-2 rounded-full shadow-lg"
                        >
                            <FaPen className="text-gray-600" />
                        </button>
                    )}
                </div>

                <h2 className=" mt-[-10] text-center text-xl font-bold text-gray-800">{user.username}</h2>

                {/* Editable User Info */}
                <div className="space-y-4 mt-6">
                    <div>
                        <label className="block text-gray-500">Username</label>
                        <input
                            type="text"
                            name="username"
                            value={formData.username}
                            onChange={handleInputChange}
                            className={`w-full p-2 border rounded-lg focus:outline-none ${isEditing ? 'border-gray-300' : 'border-transparent'}`}
                            disabled={!isEditing}
                        />
                    </div>
                    <div>
                        <label className="block text-gray-500">Email</label>
                        <input
                            type="email"
                            name="email"
                            value={formData.email}
                            className="w-full p-2 border border-transparent rounded-lg bg-gray-100 cursor-not-allowed"
                            disabled
                        />
                    </div>
                    <div>
                        <label className="block text-gray-500">Phone</label>
                        <input
                            type="text"
                            name="phoneNo"
                            value={formData.phoneNo}
                            onChange={handleInputChange}
                            className={`w-full p-2 border rounded-lg focus:outline-none ${isEditing ? 'border-gray-300' : 'border-transparent'}`}
                            disabled={!isEditing}
                        />
                    </div>
                    <div>
                        <label className="block text-gray-500">Date of Birth</label>
                        <input
                            type="text"
                            name="dob"
                            value={formData.dob}
                            onChange={handleInputChange}
                            className={`w-full p-2 border rounded-lg focus:outline-none ${isEditing ? 'border-gray-300' : 'border-transparent'}`}
                            disabled={!isEditing}
                        />
                    </div>
                    <div>
                        <label className="block text-gray-500">Address</label>
                        <input
                            type="text"
                            name="address"
                            value={formData.address}
                            onChange={handleInputChange}
                            className={`w-full p-2 border rounded-lg focus:outline-none ${isEditing ? 'border-gray-300' : 'border-transparent'}`}
                            disabled={!isEditing}
                        />
                    </div>
                </div>

                {/* Save Changes and Sign Out Buttons */}
                <div className="mt-8">
                    {isEditing ? (
                        <div className="mt-8 flex justify-center">
                            <button
                                onClick={handleSave}
                                className="text-center bg-green-500 text-white py-2 px-4 rounded-lg hover:bg-green-600 transition-all"
                            >
                                Save Changes
                            </button>
                        </div>
                    ) : (
                        <div className="mt-8 flex justify-center">
                            <button
                                className="text-center bg-red-500 text-white py-2 px-10 rounded-lg hover:bg-red-600 transition-all"
                            >
                                Sign Out
                            </button>
                        </div>
                    )}
                </div>
            </div>
        </div>
    );
};

export default Profile;
