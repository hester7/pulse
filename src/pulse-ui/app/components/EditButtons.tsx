"use client";

import { useState } from "react";
import { Dialog, DialogTitle, DialogContent, DialogActions, Button, Stack, Tooltip, IconButton } from "@mui/material";
import EditIcon from "@mui/icons-material/Edit";
import DeleteIcon from "@mui/icons-material/Delete";
import SaveIcon from "@mui/icons-material/Save";
import CancelIcon from "@mui/icons-material/Cancel";

type EditButtonsProps = {
    onEdit: () => void;
    onDelete: () => void;
    onSave: () => Promise<boolean>;
    onCancel: () => void;
    type: string;
};

export const EditButtons = ({ onEdit, onDelete, onSave, onCancel, type }: EditButtonsProps) => {
    const [isEditMode, setEditMode] = useState(false);
    const [isDeleteDialogOpen, setDeleteDialogOpen] = useState(false);

    const handleEditClick = (event: React.MouseEvent<HTMLButtonElement>) => {
        event.stopPropagation();
        setEditMode(true);
        onEdit();
    };

    const handleDeleteClick = (event: React.MouseEvent<HTMLButtonElement>) => {
        event.stopPropagation();
        setDeleteDialogOpen(true);
    };

    const handleSaveClick = async (event: React.MouseEvent<HTMLButtonElement>) => {
        event.stopPropagation();
        const isSaveSuccessful = await onSave();

        if (isSaveSuccessful) {
            setEditMode(false);
        }
    };

    const handleCancelClick = (event: React.MouseEvent<HTMLButtonElement>) => {
        event.stopPropagation();
        setEditMode(false);
        onCancel();
    };

    const handleDeleteConfirm = (event: React.MouseEvent<HTMLButtonElement>) => {
        event.stopPropagation();
        setDeleteDialogOpen(false);
        onDelete();
    };

    const handleDeleteCancel = (event: React.MouseEvent<HTMLButtonElement>) => {
        event.stopPropagation();
        setDeleteDialogOpen(false);
    };

    return (
        <>
            <Stack direction="row">
                {isEditMode ? (
                    <>
                        <Tooltip title="Save">
                            <IconButton onClick={handleSaveClick}>
                                <SaveIcon />
                            </IconButton>
                        </Tooltip>
                        <Tooltip title="Cancel">
                            <IconButton onClick={handleCancelClick}>
                                <CancelIcon />
                            </IconButton>
                        </Tooltip>
                    </>
                ) : (
                    <>
                        <Tooltip title="Edit">
                            <IconButton onClick={handleEditClick}>
                                <EditIcon />
                            </IconButton>
                        </Tooltip>
                        <Tooltip title="Delete">
                            <IconButton onClick={handleDeleteClick}>
                                <DeleteIcon />
                            </IconButton>
                        </Tooltip>
                    </>
                )}
            </Stack>
            <Dialog open={isDeleteDialogOpen} onClose={handleDeleteCancel}>
                <DialogTitle>Delete Confirmation</DialogTitle>
                <DialogContent>{`Are you sure you want to delete this ${type}?`}</DialogContent>
                <DialogActions>
                    <Button onClick={handleDeleteConfirm} color="primary">
                        Yes
                    </Button>
                    <Button onClick={handleDeleteCancel} color="primary" autoFocus>
                        No
                    </Button>
                </DialogActions>
            </Dialog>
        </>
    );
};
