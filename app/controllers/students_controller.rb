class StudentsController < ApplicationController
	def index
		@student=Student.all
		render :json => @student
	end
	def show
		begin
		@student=Student.find(params[:id])
		#if @student
			render :json => @student, :stauts => :ok
		#else
		#	render :json => @student.errors, :status  => :unprocessable_entity
		#end
		 rescue => e
		 # 	p e.message
		  	render :json => { "error" => e.message}, :status => :unprocessable_entity
		  end
	end
	def new
		@student=Student.new()
	end
	def edit 
	 	@student = Student.find(params[:id])
	 end
	def create
		@student = Student.new(student_param)
		
		if @student.save
			render :json => @student, :status  => :ok
		else

			render :json => @student.errors, :status  => :unprocessable_entity
		end
	end
	def update
		begin
		@student=Student.find(params[:id])
		if @student.update_attributes(student_param)
			render :json => @student, :status => :ok
		else
			render :json => @student.errors, :status  => :unprocessable_entity
		end
		rescue => e
			p e.message
			render :json => {"error" => e.message}, :status => :unprocessable_entity
		end
	end
	
	
	def destroy
		p params[:id]
		begin
			@student=Student.find(params[:id])
			
			if @student.destroy
				render :json => @student, :status => :ok
			else	
				render :json => @student.errors ,:status => :unprocessable_entity
			end
		rescue => e
			p e.message
			render :json => {"error" => e.message}, :status => :unprocessable_entity
		end
	end

	def student_param
		 params.require(:student).permit(:name, :father_name, :mother_name, :phone_no, :address, :city, :zipcode, :state, :school_id, :classroom_id)
	end	
end
