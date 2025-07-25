import { ApiTags, ApiOperation, ApiResponse, ApiParam } from '@nestjs/swagger';
import { PersonService } from './person.service';
import { PersonDTO } from './DTO/person.dto';
import { Response } from 'express';
import {
	Controller,
	Get,
	Res,
	Post,
	UseFilters,
	HttpStatus,
	Param,
	// HttpCode,
	NotFoundException,
	// Param,
	Body,
	// Request,
	// Patch,
	Delete,
} from '@nestjs/common';


@ApiTags('persons')
@Controller('persons')
export class PersonController {
	constructor(private readonly personService: PersonService) {}

	@ApiOperation({ summary: 'Получены фейковые Persons' })
	@ApiResponse({
		status: 200,
		type: [PersonDTO],
	})
	@Get(':cnt')
	public async getPersons(@Res() res: Response, @Param('cnt') cnt: number) {
		const persons = await this.personService.getPersons(cnt);
		if (!persons) {
			throw new NotFoundException('Persons not found');
		}
		return res.status(HttpStatus.OK).json(persons);
	}

	@ApiOperation({ summary: 'Фейковые Persons отправлены в очередь' })
	@ApiResponse({
		status: 200,
		type: [PersonDTO],
	})
	@Get('/start/:cnt')
	public async personToQueue(@Res() res: Response, @Param('cnt') cnt: number) {
		const persons = await this.personService.getPersons(cnt);
		if (!persons) {
			throw new NotFoundException('Persons not found');
		}
		return res.status(HttpStatus.OK).json(persons);
	}
}
