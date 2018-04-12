import Form from './Form';
import InputForm from './InputForm';
import SelectForm from './SelectForm';
import TreeSelectForm from './TreeSelectForm';
import DateForm from './DateForm';
import CascadeForm from './CascadeForm';
import CustomForm from './CustomForm';
import InputNumberForm from './InputNumberForm';

Form.InputForm = InputForm;
Form.SelectForm = SelectForm;
Form.TreeSelectForm = TreeSelectForm;
Form.DateForm = DateForm;
Form.CascadeForm = CascadeForm;
Form.CustomForm = CustomForm;
Form.InputNumberForm = InputNumberForm;

export { InputForm, SelectForm, DateForm, CascadeForm, TreeSelectForm, CustomForm, InputNumberForm };
export default Form;