import React, { useState } from 'react';
import Grid from '@mui/material/Grid';
import Radio from '@mui/material/Radio';
import TextField from '@mui/material/TextField';
import MenuItem from '@mui/material/MenuItem';
import Select from '@mui/material/Select';
import FormControlLabel from '@mui/material/FormControlLabel';
import Button from '@mui/material/Button';
import Autocomplete from '@mui/material/Autocomplete';

const basicObjectStructure = {
  SelectedRow: false,
  groupId: 1,
  parameterType: 'variable',
  constantValue: '',
  patameterValue: { id: 'age', label: 'Age' },
  operatorValue: { type: 'and', value: 'And' },
};
const LogicBuilderComponent = (props) => {
  let [logicDesign, setLogicDesign] = useState([
    basicObjectStructure,
    {
      SelectedRow: true,
      groupId: 1,
      parameterType: 'constant',
      constantValue: 'hard coded',
      patameterValue: { id: 'age', label: 'Age' },
      operatorValue: { type: 'and', value: 'And' },
    },
    basicObjectStructure,
  ]);

  const parameterList = [
    { id: 'age', label: 'Age' },
    { id: 'gender', label: 'Gender' },
    { id: 'mem', label: 'Average Haemoglobin' },
  ];
  const operatorList = [{ type: 'and', value: 'And' }];

  let onClickAddRow = () => {
    let arr = [...logicDesign];
    let idx = arr.findIndex((obj) => obj.SelectedRow);
    idx = idx == -1 ? arr.length : idx + 1;
    arr.splice(idx, 0, basicObjectStructure);
    setLogicDesign(arr);
    console.log(arr);
  };

  let onClickRemoveRow = () => {
    if (logicDesign.length > 1) {
      let arr = [];
      let iDx = 0;
      logicDesign.forEach((obj, i) => {
        if (!obj.SelectedRow) {
          arr.push({ ...obj });
        } else if (i > 1) {
          iDx = i - 1;
        }
      });
      arr.forEach((obj, i) => {
        if (i === iDx) obj.SelectedRow = true;
      });
      setLogicDesign(arr);
    } else {
      alert('minimum one row required');
    }
  };

  let handleSelectRowChange = (e, v, index) => {
    console.log(v, index);
    let arr = [];
    logicDesign.forEach((obj, i) => {
      console.log(i);
      console.log(index);
      let tmpobj = { ...obj };
      if (i === index) {
        tmpobj['SelectedRow'] = true;
      } else {
        tmpobj['SelectedRow'] = false;
      }
      arr.push(tmpobj);
    });
    console.log(arr);
    setLogicDesign(arr);
  };

  let handleSelectTypeVariable = (e, v, index) => {
    console.log(v, index);
  };

  let handleSelectTypeConstant = (e, v, index) => {
    console.log(v, index);
  };
  let onChangeConstantValue = () => {};
  let onChangeGrouiId = (e, idx) => {
    console.log(e);
    console.log('value=', e.target.value);
    console.log('index=', idx);
  };
  return (
    <div>
      <Grid container spacing={2}>
        <Grid item xs={1}>
          Select
        </Grid>
        <Grid item xs={2}>
          Group ID
        </Grid>
        <Grid item xs={4}>
          Parameter Type
        </Grid>
        <Grid item xs={3}>
          Parameter
        </Grid>
        <Grid item xs={2}>
          operator
        </Grid>

        {logicDesign.map((ldObj, index) => {
          return (
            <>
              <Grid item xs={1} key={index}>
                <Radio
                  key={index}
                  checked={ldObj.SelectedRow}
                  onChange={(e, v) => handleSelectRowChange(e, v, index)}
                  // value={index}
                />
              </Grid>
              <Grid item xs={2} key={index}>
                <TextField
                  size="small"
                  variant="outlined"
                  id={'Group-' + index}
                  type="number"
                  value={ldObj.groupId}
                  onChange={(e) => onChangeGrouiId(e, index)}
                />
              </Grid>
              <Grid item xs={2} key={index}>
                <FormControlLabel
                  control={
                    <Radio
                      checked={ldObj.parameterType === 'variable'}
                      onChange={(e, v) => handleSelectTypeVariable(e, v, index)}
                    />
                  }
                  id={'Variable-' + index}
                  label={'Variable'}
                />
              </Grid>
              <Grid item xs={2}>
                <FormControlLabel
                  control={
                    <Radio
                      checked={ldObj.parameterType === 'constant'}
                      onChange={(e, v) => handleSelectTypeConstant(e, v, index)}
                    />
                  }
                  id={'constant-' + index}
                  label="constant"
                />
              </Grid>
              <Grid item xs={3} key={index}>
                {ldObj.parameterType === 'variable' ? (
                  <Autocomplete
                    disablePortal
                    disableClearable
                    id={'variable-' + index}
                    options={parameterList}
                    size="small"
                    value={ldObj.patameterValue}
                    getOptionLabel={(option) => option.label}
                    renderInput={(params) => <TextField {...params} />}
                  />
                ) : (
                  <TextField
                    size="small"
                    variant="outlined"
                    id={'variable-value-' + index}
                    value={ldObj.constantValue}
                    onChange={(e) => onChangeConstantValue(e, index)}
                  />
                )}
              </Grid>
              <Grid item xs={2}>
                <Autocomplete
                  disablePortal
                  disableClearable
                  id={'operator-' + index}
                  options={operatorList}
                  size="small"
                  getOptionLabel={(option) => option.value}
                  value={ldObj.operatorValue}
                  renderInput={(params) => <TextField {...params} />}
                />
              </Grid>
            </>
          );
        })}
      </Grid>

      <Button variant="contained" onClick={onClickAddRow}>
        Add row
      </Button>
      <Button variant="contained" onClick={onClickRemoveRow}>
        Delete Row
      </Button>
    </div>
  );
};

export default LogicBuilderComponent;
