import { Body, Controller, Get, Post } from '@nestjs/common';
import { DisplayService } from './display.service';
import { SetTransitionDto } from './dto/set-transition.dto';

@Controller('display-settings')
export class DisplayController {
  constructor(private readonly displayService: DisplayService) { }

  @Get()
  getTransitionTime() {
    return { count: this.displayService.getTransitionTime() };
  }

  @Post()
  setTransitionTime(@Body() body: SetTransitionDto) {
    this.displayService.setTransitionTime(body.count);
    return { message: 'Delay time updated successfully!' };
  }
}
