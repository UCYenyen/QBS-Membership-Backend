import { Controller, Get, Param, Post, Body, Put, Delete, HttpCode, HttpStatus, ParseUUIDPipe, UseGuards } from '@nestjs/common';
import { CreateProfileDto } from './dto/create-profile-dto';
import { UpdateProfileDto } from './dto/update-profile-dto';
import { ProfilesService } from './profiles.service';
import { ProfilesGuard } from './profiles.guard';

@Controller('profiles')
export class ProfilesController {
    constructor(private profilesService: ProfilesService) {}

    // GET /profiles
    @Get()
    findAll() {
        return this.profilesService.findAll();
    }

    // GET /profiles/:id
    @Get(':id')
    findOne(@Param('id', new ParseUUIDPipe()) id: string) {
        return this.profilesService.findOne(id);
    }

    // POST /profiles
    @Post()
    create(@Body() createProfileDto: CreateProfileDto) {
        return this.profilesService.create(createProfileDto);
    }

    // PUT /profiles/:id
    @Put(':id')
    update(@Param('id', new ParseUUIDPipe()) id: string, @Body() updateProfileDto: UpdateProfileDto) {
        return this.profilesService.update(id, updateProfileDto);
    }

    // DELETE /profiles/:id
    @Delete(':id')
    @UseGuards(ProfilesGuard)
    @HttpCode(HttpStatus.NO_CONTENT)
    remove(@Param('id', new ParseUUIDPipe()) id: string) {
        this.profilesService.remove(id);
    }
}
