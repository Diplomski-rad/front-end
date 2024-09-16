import * as React from "react";
import { useTheme } from "@mui/material/styles";
import Box from "@mui/material/Box";
import Table from "@mui/material/Table";
import TableBody from "@mui/material/TableBody";
import TableCell from "@mui/material/TableCell";
import TableContainer from "@mui/material/TableContainer";
import TableFooter from "@mui/material/TableFooter";
import TablePagination from "@mui/material/TablePagination";
import TableRow from "@mui/material/TableRow";
import Paper from "@mui/material/Paper";
import IconButton from "@mui/material/IconButton";
import FirstPageIcon from "@mui/icons-material/FirstPage";
import KeyboardArrowLeft from "@mui/icons-material/KeyboardArrowLeft";
import KeyboardArrowRight from "@mui/icons-material/KeyboardArrowRight";
import LastPageIcon from "@mui/icons-material/LastPage";
import TableHead from "@mui/material/TableHead";
import User from "../../model/User";

import styles from "./table.module.css";
import ConfirmationDialog from "../confirmation-dialog/confirmation-dialog";
import { banUser, unbanUser } from "../../service/user.service";
import { makeToastNotification } from "../../service/toast.service";

interface TablePaginationActionsProps {
  count: number;
  page: number;
  rowsPerPage: number;
  onPageChange: (
    event: React.MouseEvent<HTMLButtonElement>,
    newPage: number
  ) => void;
}

function TablePaginationActions(props: TablePaginationActionsProps) {
  const theme = useTheme();
  const { count, page, rowsPerPage, onPageChange } = props;

  const handleFirstPageButtonClick = (
    event: React.MouseEvent<HTMLButtonElement>
  ) => {
    onPageChange(event, 0);
  };

  const handleBackButtonClick = (
    event: React.MouseEvent<HTMLButtonElement>
  ) => {
    onPageChange(event, page - 1);
  };

  const handleNextButtonClick = (
    event: React.MouseEvent<HTMLButtonElement>
  ) => {
    onPageChange(event, page + 1);
  };

  const handleLastPageButtonClick = (
    event: React.MouseEvent<HTMLButtonElement>
  ) => {
    onPageChange(event, Math.max(0, Math.ceil(count / rowsPerPage) - 1));
  };

  return (
    <Box sx={{ flexShrink: 0, ml: 2.5 }}>
      <IconButton
        onClick={handleFirstPageButtonClick}
        disabled={page === 0}
        aria-label="first page"
      >
        {theme.direction === "rtl" ? <LastPageIcon /> : <FirstPageIcon />}
      </IconButton>
      <IconButton
        onClick={handleBackButtonClick}
        disabled={page === 0}
        aria-label="previous page"
      >
        {theme.direction === "rtl" ? (
          <KeyboardArrowRight />
        ) : (
          <KeyboardArrowLeft />
        )}
      </IconButton>
      <IconButton
        onClick={handleNextButtonClick}
        disabled={page >= Math.ceil(count / rowsPerPage) - 1}
        aria-label="next page"
      >
        {theme.direction === "rtl" ? (
          <KeyboardArrowLeft />
        ) : (
          <KeyboardArrowRight />
        )}
      </IconButton>
      <IconButton
        onClick={handleLastPageButtonClick}
        disabled={page >= Math.ceil(count / rowsPerPage) - 1}
        aria-label="last page"
      >
        {theme.direction === "rtl" ? <FirstPageIcon /> : <LastPageIcon />}
      </IconButton>
    </Box>
  );
}

interface CustomPaginationActionsTableProps {
  users: User[];
  onBanUnban: () => void;
}

const CustomPaginationActionsTable: React.FC<
  CustomPaginationActionsTableProps
> = (props) => {
  const [page, setPage] = React.useState(0);
  const [rowsPerPage, setRowsPerPage] = React.useState(10);

  const [isBanDialogOpen, setIsBanDialogOpen] = React.useState<boolean>(false);
  const [isUnbanDialogOpen, setIsUnbanDialogOpen] =
    React.useState<boolean>(false);
  const [selectedUser, setSelectedUser] = React.useState<User | null>(null);

  // Avoid a layout jump when reaching the last page with empty rows.
  const emptyRows =
    page > 0 ? Math.max(0, (1 + page) * rowsPerPage - props.users.length) : 0;

  const handleChangePage = (
    event: React.MouseEvent<HTMLButtonElement> | null,
    newPage: number
  ) => {
    setPage(newPage);
  };

  const handleChangeRowsPerPage = (
    event: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>
  ) => {
    setRowsPerPage(parseInt(event.target.value, 10));
    setPage(0);
  };

  const handleBanConfirm = async () => {
    if (selectedUser) {
      try {
        await banUser(selectedUser.id);
        makeToastNotification("User successfully baned.", true);
        props.onBanUnban();
      } catch (error) {
        makeToastNotification(
          "An error occurred while banning the user.",
          false
        );
      }
    }
    setIsBanDialogOpen(false);
  };

  const handleUnbanConfirm = async () => {
    if (selectedUser) {
      try {
        await unbanUser(selectedUser.id);
        makeToastNotification("User successfully unbaned.", true);
        props.onBanUnban();
      } catch (error) {
        makeToastNotification(
          "An error occurred while unbanning the user.",
          false
        );
      }
    }
    setIsUnbanDialogOpen(false);
  };

  return (
    <div>
      <TableContainer component={Paper}>
        <Table sx={{ minWidth: 500 }} aria-label="Users table">
          <TableHead>
            <TableRow>
              <TableCell sx={{ backgroundColor: "black", color: "white" }}>
                Username
              </TableCell>
              <TableCell sx={{ backgroundColor: "black", color: "white" }}>
                Email
              </TableCell>
              <TableCell sx={{ backgroundColor: "black", color: "white" }}>
                Role
              </TableCell>
              <TableCell sx={{ backgroundColor: "black", color: "white" }}>
                Is active
              </TableCell>
              <TableCell
                sx={{ backgroundColor: "black", color: "white" }}
              ></TableCell>
            </TableRow>
          </TableHead>
          <TableBody>
            {(rowsPerPage > 0
              ? props.users.slice(
                  page * rowsPerPage,
                  page * rowsPerPage + rowsPerPage
                )
              : props.users
            ).map((user) => (
              <TableRow key={user.id}>
                <TableCell component="th" scope="row" sx={{ fontSize: "18px" }}>
                  {user.username}
                </TableCell>
                <TableCell sx={{ fontSize: "18px" }}>{user.email}</TableCell>
                <TableCell sx={{ fontSize: "18px" }}>{user.role}</TableCell>
                <TableCell sx={{ fontSize: "18px" }}>
                  {user.isActive ? "Active" : "Inactive"}
                </TableCell>
                <TableCell>
                  {user.isActive && (
                    <button
                      className={styles["ban-button"]}
                      onClick={() => {
                        setSelectedUser(user);
                        setIsBanDialogOpen(true);
                      }}
                    >
                      Ban user
                    </button>
                  )}
                  {!user.isActive && (
                    <button
                      className={styles["unban-button"]}
                      onClick={() => {
                        setSelectedUser(user);
                        setIsUnbanDialogOpen(true);
                      }}
                    >
                      Unban user
                    </button>
                  )}
                </TableCell>
              </TableRow>
            ))}
            {emptyRows > 0 && (
              <TableRow style={{ height: 53 * emptyRows }}>
                <TableCell colSpan={6} />
              </TableRow>
            )}
          </TableBody>
          <TableFooter>
            <TableRow>
              <TablePagination
                rowsPerPageOptions={[5, 10, 25, { label: "All", value: -1 }]}
                colSpan={3}
                count={props.users.length}
                rowsPerPage={rowsPerPage}
                page={page}
                slotProps={{
                  select: {
                    inputProps: {
                      "aria-label": "rows per page",
                    },
                    native: true,
                  },
                }}
                onPageChange={handleChangePage}
                onRowsPerPageChange={handleChangeRowsPerPage}
                ActionsComponent={TablePaginationActions}
              />
            </TableRow>
          </TableFooter>
        </Table>
      </TableContainer>
      <ConfirmationDialog
        isOpen={isBanDialogOpen}
        onConfirm={handleBanConfirm}
        onCancel={() => setIsBanDialogOpen(false)}
        message={`Are you sure you want to ban user ${selectedUser?.username}?`}
      />
      <ConfirmationDialog
        isOpen={isUnbanDialogOpen}
        onConfirm={handleUnbanConfirm}
        onCancel={() => setIsUnbanDialogOpen(false)}
        message={`Are you sure you want to unban user ${selectedUser?.username}?`}
      />
    </div>
  );
};

export default CustomPaginationActionsTable;
