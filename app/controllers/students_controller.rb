class StudentsController < ApplicationController
	def index
		@students=Student.all
		respond_to do |format|
 			# format.html 
 			format.json { render :json => @students, :stauts => :ok}
 		end
	end
	def show
		begin
			@student=Student.find(params[:id])
			respond_to do |format|
 			format.json { render :json => @student, :stauts => :ok}
 			end
 			rescue => e
		 	p e.message
		 	respond_to do |format|
 			format.json { render :json => { "error" => e.message}, :status => :unprocessable_entity}
 			end
		end
	end
	def create
		begin
		@student = Student.new(student_param)
		if @student.save
			respond_to do |format|
 			format.json {render :json => @student, :status  => :ok}
 			end
 		end
		rescue => e
			respond_to do |format|
 			format.json { render :json => { "error" => e.message}, :status => :unprocessable_entity}
 			end
		end
	end
	def update
		begin
			p "parama"
			p params
			p "parama"
		@student=Student.find(params[:id])
		p @student
		if @student.update_attributes!(student_param)
			p @student
			respond_to do |format|
				format.json {render :json => @student, :status => :ok}
 			end
 		end
		rescue => e
			p e.message
			respond_to do |format|
 				format.json {render :json => {"error" => e.message}, :status => :unprocessable_entity}
 			end
		end
	end
	def destroy
		p params[:id]
		begin
			@student=Student.find(params[:id])
			if @student.destroy
				@students = Student.all
				respond_to do |format|
 				format.json {render :json => @student, :status => :ok}
 			end
			end
			rescue => e
			p e.message
			respond_to do |format|
 			format.json {render :json => {"error" => e.message}, :status => :unprocessable_entity}
 			end
		end
	end
	def filtered_index
    # refactor this to generate dynamic query
    begin
      @students = Student.where(:classroom_id => params[:classroom_id])
      render :json => @students.to_json(:methods => [:classroom, :subject_details, :school_details]), :status => :ok
			rescue => e
			p e.message
			respond_to do |format|
 			format.json {render :json =>  { "error" => e.message}, :status  => :unprocessable_entity}
 			end
	  end
  end
	private
	def student_param
		 params.require(:student).permit(:name, :father_name, :mother_name, :phone_no, :address, :city, :zipcode, :state, :school_id, :classroom_id)
	end	
end



