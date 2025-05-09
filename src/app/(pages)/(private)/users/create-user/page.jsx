import { Box, Typography } from "@mui/material";

export default async function () {
  return (
    <>
      <Box className="createUser__container">
        <Box
          sx={{
            padding: "8px 40px 64px 40px",
            marginInline: "auto",
            display: "flex",
            flexDirection: "column",
            flex: "1 1 auto",
          }}
        >
          <Box
            sx={{
              mb: 5,
              display: "flex",
              alignItems: "center",
            }}
          >
            <Typography fontSize={'20px'} color="#1C252E" variant="h6" fontWeight={700} >Create a new user</Typography>
          </Box>
          <Box>
            <form>
                <Box display={'flex'}>
                    <Box sx={{
                        flexGrow:0,
                        flexBasis:'auto',
                        width:'260px',
                        minWidth:'0px',
                    }}>
                        <Box sx={{
                            background:'#FFFFFF',
                            color:'#1C252E',
                            position:'relative',
                            boxShadow:"0 0 2px 0 rgba(145 158 171 / 0.2),0 12px 24px -4px rgba(145 158 171 / 0.12)",
                            zIndex:0,
                            padding:"80px 40px 24px 24px",
                            overflow:'hidden',
                            borderRadius:"16px",
                        }}>
                              <Box mb={5}> 
                                 <Box padding={1} margin={'auto'} width={144} height={144} sx={{cursor:'pointer'}} overflow={'hidden'} borderRadius={'50%'} border={'1px dashed rgba(145,158,171,0.2)'}>
                                   {/* <input /> */}
                                   <Box width={'100%'} height={'100%'}  overflow={'hidden'} borderRadius={'50%'} position={'relative'}>
                                    <Box sx={{
                                        top:'0px',
                                        left:'0px',
                                        width:"100%",
                                        height:"100%",
                                        zIndex:9,
                                        display:'flex',
                                        position:'absolute',
                                        alignItems:'center',
                                        justifyContent:'center',
                                        color:'#919EAB',
                                        background:'rgba(145,158,171,0.08)',
                                        gap:1,
                                        borderRadius:"50%",
                                    }}>
                                        <img src="/addProfileIcon.svg" alt="add profile" style={{width:"32px",height:"32px",flexShrink:0,}} />
                                        <Typography fontSize={12} color="#919EAB">Upload photo</Typography>
                                    </Box>
                                   </Box>
                                 </Box>
                                 <Box>
                                    <Typography marginInline={'auto'} mt={3} fontSize={12} color="#919EAB" >Allowed *.jpeg, *.jpg, *.png, *.gif</Typography>
                                 </Box>
                              </Box>
                              <Box>
                                
                              </Box>
                        </Box>
                    </Box>
                    <Box>

                    </Box>
                </Box>
            </form>
          </Box>
        </Box>
      </Box>
    </>
  );
}
