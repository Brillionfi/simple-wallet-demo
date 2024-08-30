import { useEffect, useState } from "react";
import { Snackbar } from "@mui/joy";

export const Notification = ({
  message,
  resetMessage,
}: {
  message: string;
  resetMessage: (str: string) => void
}) => {
  const [openStatus, setOpenStatus] = useState<boolean>(false);
  const [status, setStatus] = useState<string>("");

  useEffect(() => {
    if(message !== ''){
      setStatus(message);
      setOpenStatus(true);
    }
  }, [message]);

  return (
    <Snackbar
      anchorOrigin={{ vertical: 'top', horizontal: 'right' }}
      autoHideDuration={3000}
      open={openStatus}
      onClose={()=>{ 
        setOpenStatus(false)
        setStatus("");
        resetMessage("");
      }}
    >
      {status}
    </Snackbar>
  );
};
