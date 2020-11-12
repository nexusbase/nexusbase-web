import React, { FC } from 'react';
import { ILineField } from '../../../types/database';
import { IFieldComponent } from '../../../types/components';

interface CILineField extends IFieldComponent {
  field: ILineField;
}

const LongText: FC<CILineField> = ({
  field,
  record,
  edit,
  style,
  onFocus,
  onBlur,
  update
}) => {
  const data = record.fields[field.id];
  
  if (!edit) {
    return <div>{data}</div>;
  }
  
  const onChange = (e: any) => {
    update(e.target.value);
  }
  
  return (
    <textarea
      style={style}
      onChange={onChange}
      onFocus={onFocus}
      onBlur={onBlur}
    >{data || ''}</textarea>
  )
}

export default LongText;
