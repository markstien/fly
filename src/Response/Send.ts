// todo json text html file
import { DefaultHeader, Socket } from './Response';

class Send {
  constructor(defaultHeader: DefaultHeader, socket: Socket) {}

  text(): this {
    return this;
  }
}
