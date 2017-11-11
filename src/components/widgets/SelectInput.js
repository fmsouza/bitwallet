import React from 'react';
import { Picker } from 'react-native';
import autobind from 'autobind-decorator';

export class SelectInput extends React.Component {

    state = { value: '' };

    componentWillMount() {
        const { value } = this.props;
        if (value) this.setState({ value });
    }

    @autobind
    onValueChange(value) {
        this.setState({ value });
        this.props.onValueChange(value);
    }

    render() {
        const { options, ...props } = this.props;
        return (
            <Picker
                {...props}
                selectedValue={this.state.value}
                onValueChange={this.onValueChange}
                children={options.map((option, i) => <Picker.Item key={i} {...option} />)} />
        );
    }
}