import { Injectable } from '@nestjs/common';
import { randomUUID } from 'crypto';
import { CreateProfileDto } from './dto/create-profile-dto';
import { UpdateProfileDto } from './dto/update-profile-dto';
import { NotFoundException } from '@nestjs/common';
@Injectable()
export class ProfilesService {
    private profiles = [
        { id: randomUUID(), name: 'John Doe', description: 'A sample profile' },
        { id: randomUUID(), name: 'Jane Smith', description: 'Another sample profile' },
    ];

    findAll() {
        return this.profiles;
    }

    findOne(id: string){
        return this.profiles.find((profile) => profile.id === id);
    }

    create(createProfileDto: CreateProfileDto) {
        const createdProfile = {
            id: randomUUID(),
            ...createProfileDto,
        };
        this.profiles.push(createdProfile);
        return createdProfile;
    }

    update(id: string, updateProfileDto: UpdateProfileDto){
        const matchingProfile = this.profiles.find((existingProfile) => existingProfile.id === id);
        if (!matchingProfile) {
            throw new NotFoundException('Profile with id ' + id + ' not found');
        }
        
        matchingProfile.name = updateProfileDto.name;
        matchingProfile.description = updateProfileDto.description;

        return matchingProfile;
    }

    remove(id: string) : void{
        const matchingProfileIndex = this.profiles.findIndex((existingProfile) => existingProfile.id === id);

        if(matchingProfileIndex > -1){
            this.profiles.splice(matchingProfileIndex, 1);
        }
    }
}
