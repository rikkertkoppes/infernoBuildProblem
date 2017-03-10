
import Inferno from 'inferno';
import Component from 'inferno-component';

console.log(Component);

export class MyComp extends Component<{},{}> {
    public render() {
        return 'moo';
    }
}

Inferno.render('hello world', document.querySelector('#viewContainer'));