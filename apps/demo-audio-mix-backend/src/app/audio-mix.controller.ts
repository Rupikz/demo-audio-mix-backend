import { Controller, Body, Post, UploadedFile, UseInterceptors } from "@nestjs/common";
import { FileInterceptor } from "@nestjs/platform-express";
import { AudioMixService } from "./audio-mix.service";
import { MixAudioResponseDto } from "./response/mix-audio.response.dto";
import { AudioMixEditDto } from "./request/AudioMixEditDto";

@Controller('audio/mix')
export class AudioMixController {
  constructor(
    private readonly service: AudioMixService
  ) {}

  @Post()
  @UseInterceptors(FileInterceptor('audio'))
  mixAudio(
    @Body() audioMixEditDto: AudioMixEditDto,
    @UploadedFile() audio: Express.Multer.File
  ): Promise<MixAudioResponseDto> {
    return this.service.mixAudio(audio, audioMixEditDto);
  }
}
