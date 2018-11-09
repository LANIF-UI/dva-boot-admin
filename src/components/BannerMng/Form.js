import React from 'react';
import PropTypes from 'prop-types';
import objectAssign from 'object-assign';
import Form from 'components/Form';

const formItemLayout = {
  labelCol: { span: 3 },
  wrapperCol: { span: 16 }
};

class BannerForm extends React.Component {
  static propTypes = {
    record: PropTypes.object,
    onSubmit: PropTypes.func,
    onCancel: PropTypes.func,
    columns: PropTypes.array
  };

  handleSubmit = values => {
    const { record, onSubmit } = this.props;

    onSubmit && onSubmit(objectAssign({}, record, values));
  };

  render() {
    const { columns, record } = this.props;

    return (
      <div className="banner-content">
        <Form
          className="banner-form"
          columns={columns}
          record={record}
          onSubmit={this.handleSubmit}
          formItemLayout={formItemLayout}
        />
      </div>
    );
  }
}

export default BannerForm;
