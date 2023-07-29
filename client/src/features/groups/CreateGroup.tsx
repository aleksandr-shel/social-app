import * as React from 'react';


function CreateGroup() {

    const [name, setName] = React.useState('');
    const [category, setCategory] = React.useState('');
    const [description, setDescription] = React.useState('');
    const [image, setImage] = React.useState<File>();
    const [backgroundImage, setBackgroundImage] = React.useState<File>();
    return ( 
        <>
            Create a group
        </>
     );
}

export default CreateGroup;