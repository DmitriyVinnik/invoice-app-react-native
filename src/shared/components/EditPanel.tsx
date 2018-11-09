import React from 'react';
import { View, Text, TouchableOpacity } from 'react-native';

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
    <View>
      <TouchableOpacity
        onPress={onAddButtonClick}
      >
        <Text>{`Add new ${labelButton}`}</Text>
      </TouchableOpacity>
      {
        activeId &&
        <TouchableOpacity
            onPress={onChangeButtonClick}
        >
            <Text>{`Change ${labelButton}`}</Text>
        </TouchableOpacity>
      }
      {
        activeId &&
        <TouchableOpacity
            onPress={onDeleteButtonClick}
        >
            <Text>{`Delete ${labelButton}`}</Text>
        </TouchableOpacity>
      }
    </View>
  );
};

export default EditPanel;
