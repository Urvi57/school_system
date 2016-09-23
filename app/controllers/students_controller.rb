class StudentsController < ApplicationController
	def index
		@student=Student.all
		respond_to do |format|

 			format.html 
 			format.json { render :json => @student, :stauts => :ok}
 		end
	end
	def show
		begin
		@student=Student.find(params[:id])
		respond_to do |format|

 			format.html 
 			format.json { render :json => @student, :stauts => :ok}
 		end
		
		 rescue => e
		 	p e.message
		 	respond_to do |format|
				format.html 
 				format.json { render :json => { "error" => e.message}, :status => :unprocessable_entity}
 			end
		  end
	end
	def new
		@student=Student.new()
		respond_to do |format|

 			format.html 
 			format.json { render :json => @student, :stauts => :ok}
 		end
	end
	def edit 
	 	@student = Student.find(params[:id])
	 	respond_to do |format|

 			format.html 
 			format.json { render :json => @student, :stauts => :ok}
 		end
	 end
	def create
		@student = Student.new(student_param)
		
		if @student.save
			respond_to do |format|
				format.html 
 				format.json {render :json => @student, :status  => :ok}
 			end
		else
			respond_to do |format|
				format.html 
 				format.json {render :json => @student.errors, :status  => :unprocessable_entity}
 			end
		end
	end
	def update
		begin
		@student=Student.find(params[:id])
		if @student.update_attributes(student_param)
			respond_to do |format|
				format.html 
 				format.json {render :json => @student, :status => :ok}
 			end
		else
			respond_to do |format|
				format.html 
 				format.json {render :json => @student.errors, :status  => :unprocessable_entity}
			end
		end
		rescue => e
			p e.message
			respond_to do |format|
				format.html 
 				format.json {render :json => {"error" => e.message}, :status => :unprocessable_entity}
 			end
		end
	end
	def destroy
		p params[:id]
		begin
			@student=Student.find(params[:id])
			
			if @student.destroy
				respond_to do |format|
					format.html 
 					format.json {render :json => @student, :status => :ok}
 			end
			else	
				respond_to do |format|
					format.html 
 					format.json {render :json => @student.errors ,:status => :unprocessable_entity}
 				end
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
