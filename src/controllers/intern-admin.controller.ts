import {
  repository
} from '@loopback/repository';
import {AdminRepository, InternRepository} from '../repositories';


export class InternAdminController {
  constructor(
    @repository(InternRepository)
    public internRepository: InternRepository,
    @repository(AdminRepository)
    public adminRepository : AdminRepository,
  ) { }


}
