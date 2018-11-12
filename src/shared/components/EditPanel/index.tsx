import React from 'react';
import { View } from 'react-native';
import RegularButton from '../RegularButton';
import style from './style';

export interface OwnProps {
  labelButton: string;
  activeId: number | null;
  onAddButtonClick(): void;
  onChangeButtonClick(): void;
  onDeleteButtonClick(): void;
}

const EditPanel: React.SFC<OwnProps> = (props: OwnProps) => {
  const {
    onAddButtonClick, onChangeButtonClick, onDeleteButtonClick,
    activeId, labelButton,
  } = props;

  return (
    <View style={style.container}>
      <RegularButton
        onPress={onAddButtonClick}
        title={`Add new ${labelButton}`}
      />
      {
        activeId &&
        <RegularButton
            onPress={onChangeButtonClick}
            title={`Change ${labelButton}`}
        />
      }
      {
        activeId &&
        <RegularButton
            onPress={onDeleteButtonClick}
            title={`Delete ${labelButton}`}
        />
      }
    </View>
  );
};

export default EditPanel;
