import Button from '@mui/material/Button';



const handleLogout = async e => {
    e.preventDefault();
    localStorage.clear();
    window.location.reload(false)
}



const Logout = () => {

    const token=localStorage.getItem('token');

    if(token){
        return (
            <Button
            sx={{ my: 2, color: 'white', display: 'block' }} 
            onClick={handleLogout}>
                Logout
            </Button>
        )
    } else
        return;

}

export default Logout;