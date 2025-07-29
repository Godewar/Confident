import { Link, Typography, Stack } from '@mui/material';

const AuthFooter = () => {
  return (
    <Stack direction="row" justifyContent="space-between" spacing={2}>
      <Typography variant="subtitle2">
        &copy; {new Date().getFullYear()} Your Company Name
      </Typography>
      <Stack direction="row" spacing={2}>
        <Link href="/privacy-policy" color="inherit" underline="hover">
          Privacy Policy
        </Link>
        <Link href="/terms" color="inherit" underline="hover">
          Terms of Service
        </Link>
      </Stack>
    </Stack>
  );
};

export default AuthFooter;