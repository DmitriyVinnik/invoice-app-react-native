import React from 'react';
import Button from '@material-ui/core/Button';

export interface OwnProps {
    labelButton: string,
    activeId: number | null,
    onAddButtonClick(): void,
    onChangeButtonClick(): void,
    onDeleteButtonClick(): void,
}

const EditPanel: React.SFC<OwnProps> = (props: OwnProps) => {
    const {
        onAddButtonClick, onChangeButtonClick, onDeleteButtonClick,
        activeId, labelButton,
    } = props;

    return (
        <div className='edit-panel'>
            <div className='edit-panel__btn-wraper'>
                <Button
                    onClick={onAddButtonClick}
                    variant="contained"
                    color={"primary"}
                >
                    {`Add new ${labelButton}`}
                </Button>
                {
                    activeId &&
                    <Button
                        onClick={onChangeButtonClick}
                        variant="contained"
                        color={"primary"}
                    >
                        {`Change ${labelButton}`}
                    </Button>
                }
                {
                    activeId &&
                    <Button
                        onClick={onDeleteButtonClick}
                        variant="contained"
                        color={"primary"}
                    >
                        {`Delete ${labelButton}`}
                    </Button>
                }
            </div>
        </div>
    );
};

export default EditPanel;
