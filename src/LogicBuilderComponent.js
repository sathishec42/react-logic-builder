import React, { useState } from 'react';
import Grid from '@mui/material/Grid';
import Radio from '@mui/material/Radio';
import TextField from '@mui/material/TextField';
import FormControlLabel from '@mui/material/FormControlLabel';
import Button from '@mui/material/Button';
import Autocomplete from '@mui/material/Autocomplete';
import update from 'immutability-helper';

const validateOperatorParing = (aRR) => {
  let aRRLength = aRR.length;
  // let validateAbove=true;
  // let validateBelow=true;
  aRR.forEach((obj, index) => {
    let operator = obj.operatorValue;
    let operatorGroup = obj.operatorGroup;
    if (index === 0) {
      // no validation required
    } else if (index === 1) {
      // no validation required
    } else if (index === 2) {
      // no validation required
    } else if (index > 2) {
      if (index === 0) {
        //validate only below
        //validate arithmetic below
        //validate relational below
        //validate logical below
      }
      if (index === aRRLength - 1) {
        //validate only above
        //validate arithmetic above
        //validate relational above
        //validate logical above
      }
      if (index !== aRRLength - 1 && index !== 0) {
        //validate both above and below
        //validate arithmetic above and below
        //validate relational above and below
        //validate logical above and below
      }
    }
  });

  return aRR;
};

const basicObjectStructure = {
  SelectedRow: false,
  groupId: 1,
  parameterType: 'variable',
  constantValue: '',
  patameterValue: { id: 'age', label: 'Age' },
  operatorValue: { value: 'and', label: 'And', errorOperator: true },
};
const LogicBuilderComponent = (props) => {
  let [logicDesign, setLogicDesign] = useState([
    { ...basicObjectStructure, SelectedRow: true },
  ]);

  const parameterList = [
    { id: 'age', label: 'Age' },
    { id: 'gender', label: 'Gender' },
    { id: 'mem', label: 'Average Haemoglobin' },
  ];
  const operatorList = [
    {
      category: 'Relational operators',
      operatorGroup: 'relational',
      label: 'Less than',
      value: '<',
      errorOperator: false,
    },
    {
      category: 'Relational operators',
      operatorGroup: 'relational',
      label: 'Less than or equal to',
      value: '<=',
      errorOperator: false,
    },
    {
      category: 'Relational operators',
      operatorGroup: 'relational',
      label: 'Greater than',
      value: '>',
      errorOperator: false,
    },
    {
      category: 'Relational operators',
      operatorGroup: 'relational',
      label: 'Greater than or equal to',
      value: '>=',
      errorOperator: false,
    },
    {
      category: 'Relational operators',
      operatorGroup: 'relational',
      label: 'Not equal to',
      value: '!=',
      errorOperator: false,
    },
    {
      category: 'Arithmetic operators',
      operatorGroup: 'arithmetic',
      label: 'DaysBetween',
      value: 'DaysBetween',
      errorOperator: false,
    },
    {
      category: 'Arithmetic operators',
      operatorGroup: 'arithmetic',
      label: 'YearsBetween',
      value: 'YearsBetween',
      errorOperator: false,
    },
    {
      category: 'Arithmetic operators',
      operatorGroup: 'arithmetic',
      label: 'Find in previous repeat groups',
      value: 'Find in previous repeat groups',
      errorOperator: false,
    },
    {
      category: 'Arithmetic operators',
      operatorGroup: 'arithmetic',
      label: 'Go to repeat group and retrieve field value',
      value: 'Go to repeat group and retrieve field value',
      errorOperator: false,
    },
    {
      category: 'Arithmetic operators',
      operatorGroup: 'arithmetic',
      label: 'Add',
      value: '+',
      errorOperator: false,
    },
    {
      category: 'Arithmetic operators',
      operatorGroup: 'arithmetic',
      label: 'Subtract',
      value: '-',
      errorOperator: false,
    },
    {
      category: 'Logical operators',
      operatorGroup: 'logical',
      label: 'AND',
      value: 'and',
      errorOperator: false,
    },
    {
      category: 'Logical operators',
      operatorGroup: 'logical',
      label: 'OR',
      value: 'or',
      errorOperator: false,
    },
    {
      category: 'Logical operators',
      operatorGroup: 'logical',
      label: 'NAND',
      value: 'nand',
    },
    {
      category: 'Logical operators',
      operatorGroup: 'logical',
      label: 'NOR',
      value: 'nor',
    },
    {
      category: 'Logical operators',
      operatorGroup: 'logical',
      label: 'XOR',
      value: 'xor',
    },
    {
      category: 'Logical operators',
      operatorGroup: 'logical',
      label: 'XNOR',
      value: 'xnor',
    },
  ];

  let onClickAddRow = () => {
    let arr = [...logicDesign];
    let groupId = arr[logicDesign.length - 1].groupId;
    let obj = { ...basicObjectStructure, groupId };
    let idx = arr.findIndex((obj) => obj.SelectedRow);
    idx = idx == -1 ? arr.length : idx + 1;
    arr.splice(idx, 0, obj);
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

  let handleParameterType = (e, v, index) => {
    console.log(v, index);
    logicDesign = update(logicDesign, {
      [index]: { parameterType: { $set: v } },
    });
    setLogicDesign(logicDesign);
  };

  let onChangeConstantValue = (e, currentIndex) => {
    logicDesign = update(logicDesign, {
      [currentIndex]: { constantValue: { $set: e.target.value } },
    });
    setLogicDesign(logicDesign);
  };
  let onChangeParameter = (e, value, currentIndex) => {
    logicDesign = update(logicDesign, {
      [currentIndex]: { patameterValue: { $set: value } },
    });
    setLogicDesign(logicDesign);
  };

  let onChangeGrouiId = (e, index) => {
    let updateCondition = true;
    let value = Number(e.target.value);
    console.log(typeof value);
    let previousValue = logicDesign[index - 1]
      ? logicDesign[index - 1].groupId
      : 0;
    let upcomingValue = logicDesign[index + 1]
      ? logicDesign[index + 1].groupId
      : value;
    console.log(previousValue, '----', value, '---', upcomingValue);
    console.log(previousValue <= value <= upcomingValue);
    if (updateCondition && logicDesign.length - 1 == index) {
      updateCondition =
        previousValue <= value &&
        (value - previousValue == 1 || value - previousValue == 0);
    } else {
      updateCondition = previousValue <= value && value <= upcomingValue;
    }
    if (updateCondition) {
      logicDesign = update(logicDesign, {
        [index]: { groupId: { $set: e.target.value } },
      });
      setLogicDesign(logicDesign);
    }
  };
  let onChangeOperator = (e, value, index) => {
    logicDesign = update(logicDesign, {
      [index]: { operatorValue: { $set: value } },
    });
    setLogicDesign(logicDesign);
  };
  return (
    <div>
      <Grid container spacing={2}>
        <Grid item xs={1}>
          Select
        </Grid>
        <Grid item xs={1}>
          Group ID
        </Grid>
        <Grid item xs={4}>
          Parameter Type
        </Grid>
        <Grid item xs={3}>
          Parameter
        </Grid>
        <Grid item xs={3}>
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
              <Grid item xs={1} key={index}>
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
                      onChange={(e, v) =>
                        handleParameterType(e, 'variable', index)
                      }
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
                      onChange={(e) =>
                        handleParameterType(e, 'constant', index)
                      }
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
                    onChange={(e, v) => onChangeParameter(e, v, index)}
                    renderInput={(params) => <TextField {...params} />}
                  />
                ) : (
                  <TextField
                    fullWidth
                    size="small"
                    variant="outlined"
                    id={'variable-value-' + index}
                    value={ldObj.constantValue}
                    onChange={(e) => onChangeConstantValue(e, index)}
                  />
                )}
              </Grid>
              <Grid item xs={3}>
                {logicDesign.length - 1 !== index ? (
                  <Autocomplete
                    disablePortal
                    disableClearable
                    id={'operator-' + index}
                    options={operatorList}
                    size="small"
                    groupBy={(option) => option.category}
                    getOptionLabel={(option) => option.label}
                    value={ldObj.operatorValue}
                    onChange={(e, v) => onChangeOperator(e, v, index)}
                    renderInput={(params) => (
                      <TextField
                        {...params}
                        error={ldObj.operatorValue.errorOperator}
                        label={ldObj.operatorValue.errorOperator ? 'Error' : ''}
                      />
                    )}
                  />
                ) : (
                  <></>
                )}
              </Grid>
            </>
          );
        })}
      </Grid>
      <div style={{ position: 'absolute', bottom: 0, right: 0 }}>
        <Button size="small" variant="contained" onClick={onClickAddRow}>
          Add row
        </Button>
        <Button size="small" variant="contained" onClick={onClickRemoveRow}>
          Delete Row
        </Button>
      </div>
    </div>
  );
};

export default LogicBuilderComponent;
