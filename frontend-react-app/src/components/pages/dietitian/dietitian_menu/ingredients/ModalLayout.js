import Modal from '@mui/material/Modal';
import Box from '@mui/material/Box';
import { Grid, Icon, Typography } from '@mui/material';

export default function ModalLayout({children, open, setOpen}) {
    return (
        <Modal
            open={open}
            onClose={() => setOpen(false)}
            aria-labelledby="modal-title"
            aria-describedby="modal-description"
        >
            <Box
                sx={{
                    position: 'absolute',
                    display: 'flex',
                    flexDirection: 'column',
                    p: 2,
                    top: '50%',
                    left: '50%',
                    transform: 'translate(-50%, -50%)',
                    width: '88%',
                    maxHeight: '88%',
                    overflowY: 'auto',
                    
                    bgcolor: 'white',
                    boxShadow: 24,
                }}
            >
                <Grid item sx={{ marginTop: '1vh' }}>
                    <Icon 
                        onClick={() => setOpen(false)}
                        sx={{
                            position: 'absolute',
                            cursor: 'pointer',
                            right: 8,
                            top: 8,  
                        }}
                    >
                        close
                    </Icon>
                </Grid>
                <Typography
                    variant="h6"
                    component="div"
                    sx={{ mb: 2 }}
                >
                    {children}
                </Typography>
            </Box>
        </Modal>
    )
}
