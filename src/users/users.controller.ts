import { BadRequestException, Body, Controller, Get, Post, Req, Res, UnauthorizedException } from "@nestjs/common";
import * as bcrypt from "bcrypt";
import { UsersService } from "./users.service";
import { JwtService } from "@nestjs/jwt";
import { Response, Request } from "express";
import passport from "passport";

@Controller("api")
export class UsersController {
  constructor(private readonly userService: UsersService, private jwtService: JwtService) {
  }

  @Post("register")
  async register(@Body("name") name: string, @Body("email") email: string, @Body("password") password: string) {
    const hashedPassword = await bcrypt.hash(password, 12);

    const user = this.userService.create({
      name,
      email,
      password: hashedPassword
    });
    delete (await user).password;
    return user
  }

  @Post("login")
  async login(@Body("email") email: string, @Body("password") password: string, @Res({ passthrough: true }) response: Response) {
    const user = await this.userService.findOne({ email });

    //if no user
    if (!user) {
      throw new BadRequestException("Invalid credentials");
    }

    //see if passwords match correctly
    if (!await bcrypt.compare(password, user.password)) {
      throw new BadRequestException("Invalid credentials");
    }

    //generate jwt from user id
    const jwt = await this.jwtService.signAsync({ id: user.id });

    //make httpOnly cookie of jwt
    response.cookie("jwt", jwt, { httpOnly: true });

    return "successful login";
  }

  @Get("user")
  async user(@Req() request: Request) {
    try {
      //get cookie called jwt
      const cookie = request.cookies["jwt"];
      //verify jwt cookie and assign 'data' to it
      const data = await this.jwtService.verifyAsync(cookie);
      //if data doesnt exist AKA cookie
      if (!data) {
        throw new UnauthorizedException();
      }
      //find user from service by id
      const user = await this.userService.findOne({ id: data["id"] });
      //remove psw from user data and assign 'result to it'
      const { password, ...result } = user;
      //return result (user - password)
      return result;
    } catch (e) {
      throw new UnauthorizedException();
    }
  }
@Post('logout')
  async logout(@Res({ passthrough: true }) response: Response) {
    response.clearCookie('jwt');
    return 'Logged out.';
  }

}
